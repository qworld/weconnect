Features

- Implement all wechat's APIs that available
- Wechat account independent，support multi-accounts, configurable
- Admin backend for all functions & configurations

Development

- access_token control service
  - store access_token from wechat's official server and distribute it to all internal calls
  - auto access_token refresh, get it from wechat's official server every 1.5 hour
  - async process to internal calls when access_token is refreshing, 5 mins buffering time supported by wechat
  - support access_token refresh API to internal calls, when access_token expired
- openId & unionId
- official API proxy service
  - independent service for each API
  - crash restart
- log & alert
- backend
  - configuration
  - message
  - statistic & analyze