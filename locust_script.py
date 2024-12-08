from locust import HttpUser, task, between
import json
import random

class MyUser(HttpUser):
    wait_time = between(1, 3)  # Random wait time between tasks

    @task
    def create_subscription(self):
        subscription_data = {
            "userId": random.randint(1, 1000),
            "name": f"Subscription-{random.randint(1, 100)}",
            "amount": round(random.uniform(10.0, 100.0), 2),
            "lastPaymentDate": "2023-11-01",
            "nextPaymentDate": "2023-12-01"
        }
        response = self.client.post("/api/subscriptions/1234", json=subscription_data)
        if response.status_code == 201:
            print("Subscription created successfully")
        else:
            print(f"Failed to create subscription. Status: {response.status_code}, Response: {response.text}")

    @task
    def list_subscriptions(self):
        user_id = random.randint(1, 1000)
        response = self.client.get(f"/api/subscriptions/{user_id}")
        if response.status_code == 200:
            print("Subscriptions listed successfully")
        else:
            print(f"Failed to list subscriptions. Status: {response.status_code}, Response: {response.text}")

    @task
    def fetch_transactions(self):
        data = {
            "access_token": "dummy_access_token",
            "userId": random.randint(1, 1000)
        }
        response = self.client.post("/api/plaid/transactions", json=data)
        if response.status_code == 200:
            print("Transactions fetched successfully")
        else:
            print(f"Failed to fetch transactions. Status: {response.status_code}, Response: {response.text}")

    @task
    def identify_recurring(self):
        data = {"userId": random.randint(1, 1000)}
        response = self.client.post("/api/plaid/identify_recurring", json=data)
        if response.status_code == 200:
            print("Recurring transactions identified successfully")
        else:
            print(f"Failed to identify recurring transactions. Status: {response.status_code}, Response: {response.text}")

    @task
    def create_user(self):
        user_data = {
            "name": f"user_{random.randint(1, 1000)}",
            "password": "test_password",
            "userType": "host"
        }
        response = self.client.post("/api/auth/create", json=user_data)
        if response.status_code == 201:
            print("User created successfully")
        else:
            print(f"Failed to create user. Status: {response.status_code}, Response: {response.text}")

    @task
    def exchange_public_token(self):
        data = {"public_token": "dummy_public_token"}
        response = self.client.post("/api/plaid/exchange_public_token", json=data)
        if response.status_code == 200:
            print("Public token exchanged successfully")
        else:
            print(f"Failed to exchange public token. Status: {response.status_code}, Response: {response.text}")

