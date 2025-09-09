# Lines 1-10: Bucket name variable
variable "bucket_name" {
  description = "Name of the S3 bucket for website hosting"
  type        = string
  default = "static-online-chmod-calculator"
  validation {
    condition     = can(regex("^[a-z0-9.-]+$", var.bucket_name))
    error_message = "Bucket name must contain only lowercase letters, numbers, periods, and hyphens."
  }
}

# Lines 11-15: AWS region variable
variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "ap-south-1"
}

# Lines 16-25: Environment variable
variable "environment" {
  description = "Environment name (dev, staging, prod)"
  type        = string
  default     = "prod"
  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "Environment must be dev, staging, or prod."
  }
}

# Lines 26-35: Common tags variable
variable "common_tags" {
  description = "Common tags to apply to all resources"
  type        = map(string)
  default = {
    Project     = "online-chmod-calculator"
    Owner       = "Vikas_Prajapati"
    Environment = "prod"
    Terraform   = "true"
  }
}

# Lines 36-40: CloudFront enable flag
variable "enable_cloudfront" {
  description = "Whether to enable CloudFront CDN"
  type        = bool
  default     = false
}