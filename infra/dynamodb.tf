resource "aws_dynamodb_table" "images-table" {
  name           = "RecoilDesignToolImages"
  read_capacity  = 1
  write_capacity = 1
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }
}
