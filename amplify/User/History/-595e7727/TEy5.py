import os
import pymysql
import json

def lambda_handler(event, context):
    print(event)

    # RDS configuration
    db_host = os.environ['DB_HOST']
    db_user = os.environ['DB_USER']
    db_password = os.environ['DB_PASSWORD']
    db_name = os.environ['DB_NAME']

    # Connect to the database
    conn = pymysql.connect(host=db_host, user=db_user, password=db_password, db=db_name)
    cursor = conn.cursor(pymysql.cursors.DictCursor)  # Use DictCursor here

    search_results = []

    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'
    }

    try:
        # Check if DeviceID value is provided in the event
        if 'deviceID' in event:
            device_id = event['DeviceID']
            # Execute SQL query with the provided DeviceID value
            sql_query = 'SELECT * FROM hiq_db_table WHERE DEVICE_ID = %s'
            cursor.execute(sql_query, (device_id,))

            rows = cursor.fetchall()
            if not rows:
                return {
                    'statusCode': 404,
                    'body': 'Not Found',
                    'headers': headers
                }

        else:
            # If DeviceID is not provided in the event, return an error
            return {
                'statusCode': 400,
                'body': 'DeviceID not provided',
                'headers': headers
            }

        # Prepare the response data
        for row in rows:
            try:
                data = {
                    "device_id": row["DEVICE_ID"],
                    "timestamp": row["TS"],
                    "location": {
                        "lat": float(row["LAT"]),
                        "lon": float(row["LON"])
                    },
                    "solv": float(row["SOLV"]),
                    "batv": float(row["BATV"]),
                    "led_off_char": float(row["LED_OFF_CHAR"]),
                    "led_off_use": float(row["LED_OFF_USE"]),
                    "led_on_use": float(row["LED_ON_USE"]),
                    "temp": float(row["TEMP"]),
                    "humi": float(row["HUMI"]),
                    "azi": row["AZI"],
                    "cds": row["CDS"],
                    "power": row["POWER"],
                    "led_speed": row["LED_SPEED"],
                    "led_mode": row["LED_MODE"],
                    "relief": row["RELIEF"]
                }
                search_results.append(data)
            except Exception as e:
                return {
                    'statusCode': 500,
                    'body': f"Error processing row {row}: {e}",
                    'headers': headers
                }

        return {
            'statusCode': 200,
            'body': json.dumps(search_results, default=lambda o: o.__dict__),
            'headers': headers
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': str(e),
            'headers': headers
        }
    finally:
        # Close the database connection
        cursor.close()
        conn.close()
