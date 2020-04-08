# queue-i

Screen 1

+ have some info text and text asking user to put his cell number.
+ Input to ask for Cell number (here i think we should have two input boxes - one for country code and one for the number)
+ button (saying register or something like that)

2nd screen

+ a queue indicator with progress

## Sample Database

Use `json-server` (`npm install -g json-server`) and feed it a flat file named `db.json`. You can
start the contents of that file with the following:

```json
{
  "queue": [
    {
      "countrycode": "1",
      "phone": "(270) 555-1212"
    },
    {
      "countrycode": "1",
      "phone": "(555) 867-5309"
    },
    {
      "countrycode": "353",
      "phone": "+(55) 555 5555"
    }
  ]
}
```
