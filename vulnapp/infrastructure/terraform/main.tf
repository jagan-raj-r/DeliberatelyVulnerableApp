# Vulnerable Terraform configuration

provider "aws" {
  region = "us-west-2"
  # Hardcoded credentials
  access_key = "AKIAIOSFODNN7EXAMPLE"
  secret_key = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
}

# S3 bucket with public access
resource "aws_s3_bucket" "app_data" {
  bucket = "vulnapp-data-bucket"
}

resource "aws_s3_bucket_acl" "app_data_acl" {
  bucket = aws_s3_bucket.app_data.id
  acl    = "public-read-write"
}

# EC2 instance with security issues
resource "aws_instance" "web_server" {
  ami           = "ami-0c02fb55956c7d316"
  instance_type = "t2.micro"
  
  # No security group restrictions
  vpc_security_group_ids = [aws_security_group.wide_open.id]
  
  user_data = <<-EOF
    #!/bin/bash
    # Insecure software installation
    curl -sSL https://get.docker.com/ | sh
    docker run -d -p 80:3000 --privileged vulnapp:latest
  EOF
  
  tags = {
    Name = "VulnApp-WebServer"
    Environment = "production"
    # Sensitive data in tags
    DBPassword = "super_secret_db_pass"
  }
}

# Overly permissive security group
resource "aws_security_group" "wide_open" {
  name_prefix = "vulnapp-sg"
  
  # Allow all inbound traffic
  ingress {
    from_port   = 0
    to_port     = 65535
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  # Allow all outbound traffic
  egress {
    from_port   = 0
    to_port     = 65535
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
