# Lines 1-5: S3 bucket name output
output "bucket_name" {
  description = "Name of the S3 bucket"
  value       = aws_s3_bucket.website_bucket.id
}

# Lines 6-10: Website URL output
output "website_url" {
  description = "URL of the static website"
  value       = "http://${aws_s3_bucket_website_configuration.website_config.website_endpoint}"
}

# Lines 11-15: S3 bucket domain name output
output "bucket_domain_name" {
  description = "Domain name of the S3 bucket"
  value       = aws_s3_bucket.website_bucket.bucket_domain_name
}

# Lines 16-25: CloudFront distribution URL (conditional)
output "cloudfront_url" {
  description = "CloudFront distribution URL"
  value       = var.enable_cloudfront ? "https://${aws_cloudfront_distribution.website_cdn[0].domain_name}" : "Not enabled"
}

# Lines 26-30: Bucket ARN output
output "bucket_arn" {
  description = "ARN of the S3 bucket"
  value       = aws_s3_bucket.website_bucket.arn
}