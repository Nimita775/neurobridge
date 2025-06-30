// dns-setup.js
const dns = require('dns');

// Force IPv4 resolution to prevent ENOTFOUND errors
dns.setDefaultResultOrder('ipv4first');

console.log('✅ DNS configuration set to IPv4 first');

// Optional: Test DNS resolution for DeepSeek API
const testHost = 'api.deepseek.com';
dns.lookup(testHost, { all: true }, (err, addresses) => {
  if (err) {
    console.error(`❌ DNS Test Failed for ${testHost}:`, err);
    return;
  }
  
  console.log(`🔍 DNS Resolution for ${testHost}:`);
  addresses.forEach(addr => {
    console.log(`  → ${addr.family} address: ${addr.address}`);
  });
});

// Optional: Verify Google DNS as connectivity test
dns.lookup('google.com', (err) => {
  if (err) {
    console.error('❌ Internet Connectivity Test Failed:', err);
  } else {
    console.log('🌐 Internet Connectivity Verified');
  }
});