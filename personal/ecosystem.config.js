module.exports = {
    apps: [{
        name: 'tiscacatalin.com',
        script: 'npm',
        args: 'start',
        env: {
            "NODE_ENV": "production",
            "NEXT_PUBLIC_SITE_URL": "https://tiscacatalin.com",
            "STRAPI_URL": "https://strapi.tiscacatalin.com"
        }
    }],
};
