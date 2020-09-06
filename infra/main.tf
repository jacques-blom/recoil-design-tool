
terraform {
  backend "s3" {
    bucket         = "jacquesblom-terraform-remote-state"
    key            = "recoil-design-tool/terraform.tfstate"
    encrypt        = true
    region         = "us-east-1"
    dynamodb_table = "tf-state-lock"
    profile        = "personal"
  }
}

provider "aws" {
  profile = "personal"
  region  = "us-east-1"
}
