// public config, don't store sentisive data here
// for example, don't store any secret key here
require('dotenv').config();
const nodeEnv = process.env.NODE_ENV;

const gatewayUrl = {
	development: `${process.env.DEFAULT_API_GETWAY_URL}/api/v1`,
	staging: `${process.env.DEFAULT_API_GETWAY_URL}/api/v1`,
	production: `${process.env.DEFAULT_API_GETWAY_URL}/api/v1`,
};

const apiUrl = {
	employee: `${gatewayUrl[nodeEnv]}/employee`,
	customer: `${gatewayUrl[nodeEnv]}/customer`,
	vhc: `${process.env.API_GETWAY_VHC}`,
};

const MobileConnect = {
	OtpProviderUrl: process.env.OTP_PROVIDER_URL,
	OtpProviderAppId: process.env.OTP_PROVIDER_APPID,
	OtpProviderMessageId: process.env.OTP_PROVIDER_MESSAGEID,
	OtpProviderSender: process.env.OTP_PROVIDER_SENDER,
	OtpProviderToken: process.env.OTP_PROVIDER_TOKEN,
};

module.exports = { apiUrl, MobileConnect };
