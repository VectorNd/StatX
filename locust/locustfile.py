from locust import HttpUser, task, between
import json
import random
import string

class UserBehavior(HttpUser):
    wait_time = between(1, 2)  # Wait time between requests
    host = "http://172.20.0.10:8080"  # Replace with your application's base URL

    @staticmethod
    def generate_random_string(length=10):
        """Generate a random string of fixed length."""
        letters = string.ascii_letters  # Letters a-z and A-Z
        return ''.join(random.choice(letters) for i in range(length))

    @task(1)
    def search_companies(self):
        # Define the payload for the POST request with dynamic keys
        payload = {
            "input": self.generate_random_string(3),  # Dynamic key 1
            # Add more key-value pairs as needed
        }

        headers = {
            "Content-Type": "application/json",  # Set the content type
            # Add any other necessary headers here, like Authorization if needed
        }

        # Perform the POST request
        self.client.post("/api/v1/company/searchCompanies", 
                         data=json.dumps(payload), 
                         headers=headers)
