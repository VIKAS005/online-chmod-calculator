 # 🔐 Online Chmod Calculator

---

## 🎯 **Quick Access**

> **[Access the Online Chmod Calculator](http://chmod-calculator-unique-bucket.s3-website.ap-south-1.amazonaws.com)** - No installation required, works on all devices!

A modern, responsive web application for calculating Unix file permissions with real-time conversion between different formats.

## 🚀 Quick Presets
```bash
755  # rwxr-xr-x (Most web files)
644  # rw-r--r-- (Regular files) 
600  # rw------- (Private files)
777  # rwxrwxrwx (Full access)
000  # --------- (No access)
```
## 🔢 Multiple Format Support

| **Format** | **Example** | **Description** |
|:---|:---|:---|
| **Octal** | `755` | `Numeric representation` |
| **Symbolic** | `rwxr-xr-x` | `ls -l format` |
| **Command** | `chmod 755 filename` | `Ready-to-use terminal command` |

## 🔧 Getting Started (Using Your Own Fork)

Follow these steps if you want to fork this project and deploy your own version.

### Prerequisites

- AWS Account  
- AWS CLI installed and configured (`aws configure`)  
- Terraform installed (v1.0 or above recommended)  
- Github Account
- Git

### Setup

1. Clone this repository:

   ```bash
   git clone https://github.com/VIKAS005/online-chmod-calculator.git
   cd online-chmod-calculator
### Configure your AWS Terraform credentials:

```bash
aws configure
export AWS_ACCESS_KEY_ID=your_key
export AWS_SECRET_ACCESS_KEY=your_secret
export AWS_DEFAULT_REGION=ap-south-1
```
### Review/Modify Terraform settings:

In the terraform/ directory, you’ll find .tf files (for example, for S3 bucket, CloudFront).
Optionally update bucket names, domain names, etc., if desired, to avoid naming collisions.

### Init, plan, apply Terraform:

```bash
cd terraform
terraform init
terraform plan
terraform apply
```
### Accept the changes. This will:

Create an S3 bucket (for hosting static files)
Deploy the static site

## ✅ Verify S3 Bucket Creation

Now you can check the created bucket by logging into the **AWS Management Console**,  
navigating to the **S3 service**, and verifying that your Terraform-generated bucket is listed/generated.

![S3 Bucket Created](https://github.com/user-attachments/assets/209b1c4d-6282-4b7d-b5e4-a017f71121cb)

## 📬 Contact  

For questions, feedback, or collaboration opportunities, feel free to reach out:  

[![Email](https://img.shields.io/badge/Email-vikasprajapati005%40gmail.com-red?logo=gmail)](mailto:vikasprajapati005@gmail.com)  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Vikas%20Prajapati-blue?logo=linkedin)](https://www.linkedin.com/in/vikas-prajapati-986135203/)  
[![GitHub](https://img.shields.io/badge/GitHub-VIKAS005-black?logo=github)](https://github.com/VIKAS005)






