import os
import pymysql
import json

def lambda_handler(event, context):
    # RDS configuration
    db_host = os.environ['DB_HOST']
    db_user = os.environ['DB_USER']
    db_password = os.environ['DB_PASSWORD']
    db_name = os.environ['DB_NAME']

    # Connect to the database
    conn = pymysql.connect(host=db_host, user=db_user, password=db_password, db=db_name)
    cursor = conn.cursor(pymysql.cursors.DictCursor) # Use DictCursor here

    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'
    }

    try:
        # If no specific deviceID is provided, return all unique deviceIDs
        if 'deviceID' not in event:
            sql_query = 'SELECT DISTINCT DEVICE_ID FROM hiq_db_table'
            cursor.execute(sql_query)

            rows = cursor.fetchall()
            unique_device_ids = [row["DEVICE_ID"] for row in rows]
            return {
                'statusCode': 200,
                'body': json.dumps(unique_device_ids),
                'headers': headers
            }
        else:
            device_id = event['deviceID']
            sql_query = 'SELECT * FROM hiq_db_table WHERE DEVICE_ID = %s ORDER BY TS DESC LIMIT 10'
            cursor.execute(sql_query, (device_id,))

            rows = cursor.fetchall()
            if not rows:
                return {
                    'statusCode': 404,
                    'body': 'Not Found',
                    'headers': headers
                }

            search_results = []
            for row in rows:
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

            return {
                'statusCode': 200,
                'body': json.dumps(search_results),
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
