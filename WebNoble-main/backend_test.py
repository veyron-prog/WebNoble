import requests
import json
import time
from datetime import datetime

# Base URL from review request
BASE_URL = "https://24cae879-2306-444c-994f-866ba6bd63c9.preview.emergentagent.com"

# Test data
test_user = {
    "name": "Sarah Johnson",
    "email": f"sarah.johnson.{int(time.time())}@webnoble-test.com",
    "password": "SecurePass123!"
}

test_lead = {
    "name": "Michael Chen",
    "email": "michael.chen@techstartup.com",
    "business": "TechStartup Inc",
    "service": "Growth Website",
    "message": "We need a modern website for our SaaS product"
}

test_newsletter = {
    "email": f"newsletter.{int(time.time())}@webnoble-test.com"
}

test_order = {
    "plan": "Growth Website",
    "amount": 4999,
    "paymentMethod": "stripe"
}

# Store token for authenticated requests
auth_token = None

def print_test_header(test_name):
    print("\n" + "="*80)
    print(f"TEST: {test_name}")
    print("="*80)

def print_result(success, message, response=None):
    status = "✅ PASS" if success else "❌ FAIL"
    print(f"{status}: {message}")
    if response:
        print(f"Status Code: {response.status_code}")
        try:
            print(f"Response: {json.dumps(response.json(), indent=2)}")
        except:
            print(f"Response: {response.text}")
    print("-"*80)

def test_health_check():
    print_test_header("1. Health Check API")
    try:
        response = requests.get(f"{BASE_URL}/api/health", timeout=10)
        success = response.status_code == 200 and response.json().get('status') == 'ok'
        print_result(success, "Health check endpoint", response)
        return success
    except Exception as e:
        print_result(False, f"Health check failed with exception: {str(e)}")
        return False

def test_user_registration():
    print_test_header("2. User Registration API")
    global auth_token
    try:
        response = requests.post(
            f"{BASE_URL}/api/auth/register",
            json=test_user,
            timeout=10
        )
        data = response.json()
        success = response.status_code == 200 and data.get('success') == True and 'token' in data
        if success:
            auth_token = data['token']
            print(f"✅ User registered successfully. Token: {auth_token[:20]}...")
        print_result(success, "User registration", response)
        return success
    except Exception as e:
        print_result(False, f"User registration failed with exception: {str(e)}")
        return False

def test_user_login():
    print_test_header("3. User Login API")
    global auth_token
    try:
        login_data = {
            "email": test_user["email"],
            "password": test_user["password"]
        }
        response = requests.post(
            f"{BASE_URL}/api/auth/login",
            json=login_data,
            timeout=10
        )
        data = response.json()
        success = response.status_code == 200 and data.get('success') == True and 'token' in data
        if success:
            auth_token = data['token']
            print(f"✅ User logged in successfully. Token: {auth_token[:20]}...")
        print_result(success, "User login", response)
        return success
    except Exception as e:
        print_result(False, f"User login failed with exception: {str(e)}")
        return False

def test_lead_submission():
    print_test_header("4. Lead Submission API")
    try:
        response = requests.post(
            f"{BASE_URL}/api/leads",
            json=test_lead,
            timeout=10
        )
        data = response.json()
        success = response.status_code == 200 and data.get('success') == True
        print_result(success, "Lead submission", response)
        return success
    except Exception as e:
        print_result(False, f"Lead submission failed with exception: {str(e)}")
        return False

def test_newsletter_signup():
    print_test_header("5. Newsletter Signup API")
    try:
        response = requests.post(
            f"{BASE_URL}/api/newsletter",
            json=test_newsletter,
            timeout=10
        )
        data = response.json()
        success = response.status_code == 200 and data.get('success') == True
        print_result(success, "Newsletter signup", response)
        return success
    except Exception as e:
        print_result(False, f"Newsletter signup failed with exception: {str(e)}")
        return False

def test_create_order_without_auth():
    print_test_header("6. Create Order API (Without Auth)")
    try:
        response = requests.post(
            f"{BASE_URL}/api/orders",
            json=test_order,
            timeout=10
        )
        data = response.json()
        success = response.status_code == 200 and data.get('success') == True
        print_result(success, "Create order without auth", response)
        return success
    except Exception as e:
        print_result(False, f"Create order without auth failed with exception: {str(e)}")
        return False

def test_create_order_with_auth():
    print_test_header("7. Create Order API (With Auth)")
    global auth_token
    if not auth_token:
        print_result(False, "No auth token available. Skipping test.")
        return False
    try:
        headers = {"Authorization": f"Bearer {auth_token}"}
        response = requests.post(
            f"{BASE_URL}/api/orders",
            json=test_order,
            headers=headers,
            timeout=10
        )
        data = response.json()
        success = response.status_code == 200 and data.get('success') == True
        print_result(success, "Create order with auth", response)
        return success
    except Exception as e:
        print_result(False, f"Create order with auth failed with exception: {str(e)}")
        return False

def test_get_user_orders():
    print_test_header("8. Get User Orders API")
    global auth_token
    if not auth_token:
        print_result(False, "No auth token available. Skipping test.")
        return False
    try:
        headers = {"Authorization": f"Bearer {auth_token}"}
        response = requests.get(
            f"{BASE_URL}/api/user/orders",
            headers=headers,
            timeout=10
        )
        data = response.json()
        success = response.status_code == 200 and data.get('success') == True
        print_result(success, "Get user orders", response)
        return success
    except Exception as e:
        print_result(False, f"Get user orders failed with exception: {str(e)}")
        return False

def test_get_user_profile():
    print_test_header("9. Get User Profile API")
    global auth_token
    if not auth_token:
        print_result(False, "No auth token available. Skipping test.")
        return False
    try:
        headers = {"Authorization": f"Bearer {auth_token}"}
        response = requests.get(
            f"{BASE_URL}/api/user/profile",
            headers=headers,
            timeout=10
        )
        data = response.json()
        success = response.status_code == 200 and data.get('success') == True and 'user' in data
        print_result(success, "Get user profile", response)
        return success
    except Exception as e:
        print_result(False, f"Get user profile failed with exception: {str(e)}")
        return False

def test_get_all_leads():
    print_test_header("10. Get All Leads API (Admin)")
    try:
        response = requests.get(
            f"{BASE_URL}/api/leads",
            timeout=10
        )
        data = response.json()
        success = response.status_code == 200 and data.get('success') == True and 'leads' in data
        print_result(success, "Get all leads", response)
        return success
    except Exception as e:
        print_result(False, f"Get all leads failed with exception: {str(e)}")
        return False

def test_get_all_orders():
    print_test_header("11. Get All Orders API (Admin)")
    try:
        response = requests.get(
            f"{BASE_URL}/api/orders",
            timeout=10
        )
        data = response.json()
        success = response.status_code == 200 and data.get('success') == True and 'orders' in data
        print_result(success, "Get all orders", response)
        return success
    except Exception as e:
        print_result(False, f"Get all orders failed with exception: {str(e)}")
        return False

def test_user_logout():
    print_test_header("12. User Logout API")
    global auth_token
    if not auth_token:
        print_result(False, "No auth token available. Skipping test.")
        return False
    try:
        headers = {"Authorization": f"Bearer {auth_token}"}
        response = requests.post(
            f"{BASE_URL}/api/auth/logout",
            json={},  # Send empty JSON body to avoid parsing error
            headers=headers,
            timeout=10
        )
        data = response.json()
        success = response.status_code == 200 and data.get('success') == True
        print_result(success, "User logout", response)
        return success
    except Exception as e:
        print_result(False, f"User logout failed with exception: {str(e)}")
        return False

def run_all_tests():
    print("\n" + "="*80)
    print("WEBNOBLE BACKEND API TESTING")
    print(f"Base URL: {BASE_URL}")
    print(f"Test Started: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("="*80)
    
    results = {}
    
    # Test flow as per review request
    results['health_check'] = test_health_check()
    results['user_registration'] = test_user_registration()
    results['user_login'] = test_user_login()
    results['lead_submission'] = test_lead_submission()
    results['newsletter_signup'] = test_newsletter_signup()
    results['create_order_without_auth'] = test_create_order_without_auth()
    results['create_order_with_auth'] = test_create_order_with_auth()
    results['get_user_orders'] = test_get_user_orders()
    results['get_user_profile'] = test_get_user_profile()
    results['get_all_leads'] = test_get_all_leads()
    results['get_all_orders'] = test_get_all_orders()
    results['user_logout'] = test_user_logout()
    
    # Summary
    print("\n" + "="*80)
    print("TEST SUMMARY")
    print("="*80)
    passed = sum(1 for v in results.values() if v)
    total = len(results)
    print(f"Total Tests: {total}")
    print(f"Passed: {passed}")
    print(f"Failed: {total - passed}")
    print(f"Success Rate: {(passed/total)*100:.1f}%")
    print("\nDetailed Results:")
    for test_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"  {status} - {test_name}")
    print("="*80)
    
    return results

if __name__ == "__main__":
    run_all_tests()
