export const ENV = (process.env["NEXT_PUBLIC_ENV"] || "prod") as "beta" | "prod";

export const isBeta = ENV == "beta";
export const isProd = ENV == "prod";
export const isLocal = process.env["NODE_ENV"] == "development";
export const followXLink = `https://x.com/intent/follow?original_referer=zoofi.io&ref_src=twsrc^tfw|twcamp^buttonembed|twterm^follow|twgr^ZooFinanceIO&screen_name=ZooFinanceIO`;
export const TGChannelLink = "https://t.me/ZooLnt";
export const TGGroupLink = "https://t.me/zooficommunity";
