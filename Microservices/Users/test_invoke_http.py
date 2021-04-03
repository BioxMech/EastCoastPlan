from invokes import invoke_http
from os import environ

url = environ.get('url') or input("Enter Users service URL: ")  

# invoke book microservice to get all books
results = invoke_http(url, method='GET')

# invoke book microservice to create a book
email = 'ttttt@hotmail.com'
user_details = { "account_type": "user", "password": "password" }
create_results = invoke_http(
        url + "/" + email, method='POST', 
        json=user_details
    )

print()
print( create_results )
