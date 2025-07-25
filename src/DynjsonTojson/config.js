const config = {
  files:[
    // "test.json",
    "file1.json",
    "file2.json",
    "file3.json",
    "file4.json",
    "file5.json",
    "file6.json",
    // "laurent_file7.json",
    // "laurent_file8.json"
    // "laurent_raw_promodata.json"
  ],
  sourceFolder: "./data",
  extractFolder: "./ETL_export",
  logFileName: "extract_log.txt",
  patterns: [
    ["id", /"id":{"S":"([^"]*)"}/],
    ["campaignId", /"campaignId":{"S":"([^"]*)"}/],
    ["version", /"version":{"N":"([^"]*)"}/],
    ["createdAt", /"createdAt":{"N":"([^"]*)"}/],
    ["name", /"name":{"S":"([^"]*)"}/],
    ["published", /"published":{"S":"([^"]*)"}/],
    ["unpublished", /"unpublished":{"BOOL":([^}]*)}/],
    ["promotionType", /"promotionType":{"S":"([^"]*)"}/],
    ["router", /"router":{"S":"(.*?})"},?/], // JSON //
    // ["updatedAt", /"updatedAt":{"N":"([^"]*)"}/],
    // ["promotionId", /"promotionId":{"S":"([^"]*)"}/],
    // ["status", /"status":{"S":"([^"]*)"}/],
    // ["email", /"email":{"S":"([^"]*)"}/],
    // ["country", /"country":{"S":"([^"]*)"}/],
    // ["weight", /"weight":{"N":"([^"]*)"}/],
    // ["createdBy", /"createdBy":{"S":"([^"]*)"}/],
    // ["teams", /"teams":{"L":\[([^\]]*)\]}/],
    // ["artist", /"artist":{"M":{(.*)}},/],
    // ["featuredArtists", /"featuredArtists":{"L":\[([^\]]*)\]}/],
    // ["description", /"description":{"S":"([^"]*)"}/],
    // ["templateType", /"templateType":{"S":"([^"]*)"}/],
    // ["templateOption", /"templateOption":{"S":"([^"]*)"}/],
    // ["clonedFrom", /"clonedFrom":{"S":"([^"]*)"}/],
    // ["widgets", /"widgets":{"L":\[([^\]]*)\]}/],
    // ["territory", /"territory":{"S":"(.*)"},"favIconUrl/], // JSON //
    // ["createdDate", /"createdDate":{"N":"([^"]*)"}/],
    // ["lastUpdated", /"lastUpdated":{"N":"([^"]*)"}/],
    // ["lastUpdatedBy", /"lastUpdatedBy":{"S":"([^"]*)"}/],
    // ["launchDate", /"launchDate":{"N":"([^"]*)"}/],
    // ["endDate", /"endDate":{"N":"([^"]*)"}/],
    // ["themeObject", /"themeObject":{"S":"(.*)"},"endDate"/], // JSON //
    // ["css", /"css":{"S":"([^"]*)"}/],
    // ["path", /"path":{"L":\[([^\]]*)\]}/],
    // ["slug", /"slug":{"S":"([^"]*)"}/],
  ],
  // conditionalToExclude: (data, excludeList, keep) =>{
    // if (data[1] !== "5f5a6c83-7937-4eda-858d-f2e3ba59fa46") {
    //   return true;
    // }
    // if (data[2] !== "dd8fb982fcde446aa9fb87827f92cc4e") {
    //   return true;
    // }
    // if (data[8] && data[8] > 2) return true;
    // if(data[6]) {
    //   const emailParts = data[6].split('@');
    //   const emailName = emailParts[0];
    //   const domain = emailParts[1];
    //   const stripemail = emailName.replace(/\./g, '');
    //   const temp = keep.get(`${stripemail}@${domain}`)
    //   if (temp) {
    //     const newData = {
    //       ...temp,
    //       entries: temp.entries + 1,
    //       totalweight: temp.totalweight + parseInt(data[8])
    //     }
    //     keep.set(`${stripemail}@${domain}`, newData);
    //   } else {
    //     const newData = {
    //       email: `${stripemail}@${domain}`,
    //       entries: 1,
    //       totalweight: parseInt(data[8])
    //     }
    //     keep.set(`${stripemail}@${domain}`, newData)
    //   }

      // const regExp = /\./g;
      // if ([...emailName.matchAll(regExp)].length > 2) return true;

    // }
    // if (data[5] !== 'NEW') return true;
    // return false;
  // }
}

module.exports = config;
