from os import environ
import json
import os
import amqp_setup

from invokes import invoke_http

monitorBindingKey='*.notifications'

def receiveNotifications ():
    amqp_setup.check_setup()
    
    #queue_name = "User" and "Admin"
    # set up a consumer and start to wait for coming messages
    amqp_setup.channel.basic_consume(queue="Admin", on_message_callback=callback, auto_ack=True)
    amqp_setup.channel.basic_consume(queue="User", on_message_callback=callback, auto_ack=True)
    
    amqp_setup.channel.start_consuming() # an implicit loop waiting to receive messages; 
    #it doesn't exit by default. Use Ctrl+C in the command window to terminate it.  

def callback(channel, method, properties, body): # required signature for the callback; no return
    print("\nReceived a message by " + __file__)
    processNotifications(body)
    print() 

def processNotifications(notificationMsg):
    
    print("Printing the notification:")
    try:
        notification = json.loads(notificationMsg)
        print("--JSON:", notification)

        #call the invoke(create_noti + admin/user, post, json=data)
        receiver = notification["data"]["receiver"]
        invoke_http("http://localhost:5007/notifications/" + receiver, method='POST', json=notification["data"])

    except Exception as e:
        print("--NOT JSON:", e)
        print("--DATA:", notificationMsg)
    print()

if __name__ == '__main__':
    print("\nThis is " + os.path.basename(__file__), end='')
    print(": monitoring routing key '{}' in exchange '{}' ...".format(monitorBindingKey, amqp_setup.exchangename))
    receiveNotifications()