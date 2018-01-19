# IoThon clientside
This NodeJS program searches transactions from IOTA address `999999999999999999999999999999999999999999999999999999999999999999FILTERAESIOTHON`
and parses sensor data out of the trinary-encoded JSON embedded in transactions. 

# Installing
Git clone and npm install

# Usage 
Find your tag's salt with NFC and replace the salt of index.js with the value you got. 
Run `node index.js`to fetch the transactions.

# Example output
```
ojousima$ node index.js 
Querying
getNodeInfo result { appName: 'IRI',
  appVersion: '1.4.1.6',
  jreAvailableProcessors: 8,
  jreFreeMemory: 2548977184,
  jreVersion: '1.8.0_151',
  jreMaxMemory: 11453595648,
  jreTotalMemory: 3671588864,
  latestMilestone: 'HNTZMGJHGPRUGIZOXIZSJQUOVRFLAHLXCTUNMGPZFOJKQZRUT9XYQUAIDDEGLENZ9YMCYOGUCWJXZ9999',
  latestMilestoneIndex: 330788,
  latestSolidSubtangleMilestone: 'HNTZMGJHGPRUGIZOXIZSJQUOVRFLAHLXCTUNMGPZFOJKQZRUT9XYQUAIDDEGLENZ9YMCYOGUCWJXZ9999',
  latestSolidSubtangleMilestoneIndex: 330788,
  neighbors: 9,
  packetsQueueSize: 0,
  time: 1516366557077,
  tips: 5173,
  transactionsToRequest: 1,
  duration: 0 }
transactions found!
Raw data is:  0201061BFF9904060DC179281C0E303935F29CAEB89339F57453F65900000000
Encryption key is: 4462c46a3435363760fe5432971d625b
Ciphertext is: 0dc179281c0e303935f29caeb89339f5
Nonce is: 7453f659
Cleartext is:  0340193ec3e30054003004140b17000000

{ humidity: 32,
  temperature: 25.62,
  pressure: 100147,
  accelerationX: 84,
  accelerationY: 48,
  accelerationZ: 1044,
  battery: 2839,
  timestamp: '2017-12-28T20:41:34Z',
  mac: 'EA17E9643A7A',
  rssi: -43 }
Raw data is:  0201061BFF990406AA003ABAD8DDD31146B0D43462B25DD829178D5F00000000
Encryption key is: 1926bf6c3435363760fe5432971d625b
Ciphertext is: aa003abad8ddd31146b0d43462b25dd8
Nonce is: 29178d5f
Cleartext is:  03411936c3e40054003404140b11000000

{ humidity: 32.5,
  temperature: 25.54,
  pressure: 100148,
  accelerationX: 84,
  accelerationY: 52,
  accelerationZ: 1044,
  battery: 2833,
  timestamp: '2017-12-28T20:40:05Z',
  mac: 'EA17E9643A7A',
  rssi: -47 }
Raw data is:  0201061BFF99040685D0B7C8B1ABB62A0AB3B2CF4DE07BC131252BB100000000
Encryption key is: 011419823435363760fe5432971d625b
Ciphertext is: 85d0b7c8b1abb62a0ab3b2cf4de07bc1
Nonce is: 31252bb1
Cleartext is:  03461830c3e90050003804100b35000000
```