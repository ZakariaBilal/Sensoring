var env = process.env.NODE_ENV;
var fs = require('fs');
var base_path = './config/env/';
var controller = {};
controller.init = () => {
	if(!env)
	{
		process.env.NODE_ENV = 'default'
	}
	if (!fs.existsSync(base_path+"files")){
	    fs.mkdirSync(base_path+"files");
	}
	var templateFile = 'template';
	var configFile = process.env.NODE_ENV;

    if (!fs.existsSync(getPath("files/"+configFile)))
    {
    	if(process.env.NODE_ENV)
       	console.log('Please add your envirenment file config : ');
		fs.writeFileSync(getPath("files/"+configFile), fs.readFileSync(getPath(templateFile)));
    }
    var config = require("./files/"+configFile);
    console.log('Loading config file : ' + getPath(configFile), config);
	return config;
}
controller.setGlobal = () => {
    //============================================================================================================ set app env
    //set node env
    global.CONFIG.server.node.fileName = process.env.node_app_fileName || global.CONFIG.server.node.fileName;
    global.CONFIG.server.node.newFile = process.env.node_app_fileName || global.CONFIG.server.node.newFile;
    global.CONFIG.server.node.port = process.env.node_instance_port || process.env.node_app_port || global.CONFIG.server.node.port;
    //set redis env
    if(global.CONFIG.server.redis){
        global.CONFIG.server.redis.host = process.env.redis_01_host || global.CONFIG.server.redis.host;
        global.CONFIG.server.redis.port = process.env.redis_01_port || global.CONFIG.server.redis.port;
    }

    if(process.env.redis_cluster_enabled == 'true')
    {
    	global.CONFIG.server.redisCluster = global.CONFIG.server.redisCluster || {};
        global.CONFIG.server.redisCluster.enabled = true;
        global.CONFIG.server.redisCluster.balance = "random";
        global.CONFIG.server.redisCluster.servers = [
            {
                host : process.env.redis_01_host,
                port : process.env.redis_01_port,
                access : "RW"
            },
            {
                host : process.env.redis_02_host,
                port : process.env.redis_02_port,
                access : "R"
            },
            {
                host : process.env.redis_03_host,
                port : process.env.redis_03_port,
                access : "R"
            }
        ]

    }
    global.__info = {}
    global.__info.app = {
        name : process.env.app_name,
        scm : {
            server : process.env.scm_repo,
            branch : process.env.app_branch,
            revision : process.env.app_scm_revision,
            version : process.env.app_scm_code,
            release : process.env.app_scm_release,
        }
    }
    global.__info.instance = {
        id : process.env.instance_name,
        name : process.env.instance_name,
        fqdn : process.env.no_proxy,
        no_proxy : process.env.no_proxy,
        process : {
            fileName : process.env.node_app_fileName,
            dir : process.env.instance_dir,
        },
        logs : {
            dir : process.env.instance_logs_dir
        },
        tags : {
            version : process.env.instance_tag_version,
            theme : process.env.instance_tag_theme,
            env : process.env.instance_tag_env,
            client : process.env.client_name,
        }
    }
}
function getPath(name){
	return base_path+name+'.json';
}

module.exports = controller;