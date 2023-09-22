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

    device_id = event['queryStringParameters'].get('deviceID', None) if event.get('queryStringParameters') else None

    try:
        # If no specific deviceID is provided, return all unique deviceIDs
        if not device_id:
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
            sql_query = 'SELECT * FROM hiq_db_table WHERE DEVICE_ID = %s ORDER BY TS DESC LIMIT 10'
            cursor.execute(sql_query, (device_id,))

            rows = cursor.fetchall()
            if not rows:
                return {
                    'statusCode': 404,
                    'body': 'Not Found',
                    'headers': headers
                }

            search_results = [dict(row) for row in rows]  # Convert row to dict

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