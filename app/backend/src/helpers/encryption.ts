import crypto from "crypto";

const INSTANCE_ENCRYPTION_KEY = "test key"

export function encrypt(text: string) {
  const iv = crypto.randomBytes( 16 );
  const salt = crypto.randomBytes( 16 );
  const key = crypto.scryptSync( INSTANCE_ENCRYPTION_KEY, salt, 32 );

  const cipher = crypto.createCipheriv( "aes-256-cbc", key, iv );
  let encrypted = cipher.update( text, "utf8", "hex" );
  encrypted += cipher.final( "hex" );

  return `${ iv.toString( "hex" ) }:${ salt.toString( "hex" ) }:${ encrypted }`;
}

export function decrypt(text: string) {
  const [ ivs, salts, data ] = text.split( ":" );
  const iv = Buffer.from( ivs, "hex" );
  const salt = Buffer.from( salts, "hex" );
  const key = crypto.scryptSync( INSTANCE_ENCRYPTION_KEY, salt, 32 );

  const decipher = crypto.createDecipheriv( "aes-256-cbc", key, iv );
  let decrypted = decipher.update( data, "hex", "utf8" );
  decrypted += decipher.final( "utf8" );

  return decrypted.toString();
}

export function generateRandomStringOfLength(length: number) {
  const characters = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890\\/-_=+)(*&^%$£\"!#~'@;:|?.,><";

  return Array.from( { length }, () => characters[Math.floor( Math.random() * characters.length )] ).join( "" );
}
