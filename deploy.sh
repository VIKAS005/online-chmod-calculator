#!/bin/bash
# Lines 1-5: Script header and error handling
set -e
echo "🚀 Starting deployment of Chmod Calculator..."

# Lines 6-15: Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Lines 16-25: Check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    if ! command -v terraform &> /dev/null; then
        print_error "Terraform is not installed. Please install Terraform first."
        exit 1
    fi
    
    if ! command -v aws &> /dev/null; then
        print_error "AWS CLI is not installed. Please install AWS CLI first."
        exit 1
    fi
    
    print_status "Prerequisites check passed ✅"
}

# Lines 26-35: Validate AWS credentials
validate_aws_credentials() {
    print_status "Validating AWS credentials..."
    
    if ! aws sts get-caller-identity &> /dev/null; then
        print_error "AWS credentials not configured. Run 'aws configure' first."
        exit 1
    fi
    
    print_status "AWS credentials validated ✅"
}

# Lines 36-50: Terraform operations
terraform_init() {
    print_status "Initializing Terraform..."
    cd terraform
    terraform init
    print_status "Terraform initialized ✅"
}

terraform_plan() {
    print_status "Creating Terraform plan..."
    terraform plan -out=tfplan
    print_status "Terraform plan created ✅"
}

terraform_apply() {
    print_status "Applying Terraform configuration..."
    terraform apply tfplan
    print_status "Terraform applied successfully ✅"
}

# Lines 51-60: Get deployment outputs
get_outputs() {
    print_status "Getting deployment outputs..."
    echo "📊 Deployment Results:"
    echo "====================="
    terraform output
    echo "====================="
}

# Lines 61-75: Main deployment function
main() {
    print_status "Starting Chmod Calculator deployment process"
    
    check_prerequisites
    validate_aws_credentials
    terraform_init
    terraform_plan
    
    echo ""
    print_warning "About to deploy infrastructure. Continue? (y/n)"
    read -r response
    
    if [[ "$response" == "y" || "$response" == "Y" ]]; then
        terraform_apply
        get_outputs
        print_status "🎉 Deployment completed successfully!"
        print_status "Your chmod calculator is now live!"
    else
        print_status "Deployment cancelled by user."
        rm -f tfplan
    fi
    
    cd ..
}

# Lines 76-80: Script execution
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi
