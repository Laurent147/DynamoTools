const config = {
  files:[
    // "laurent_test.json",
    "laurent_file1.json",
    "laurent_file2.json",
    "laurent_file3.json",
    "laurent_file4.json",
    // "laurent_file5.json",
    // "laurent_file6.json",
    // "laurent_file7.json",
    // "laurent_file8.json"
    // "laurent_raw_promodata.json"
  ],
  sourceFolder: "./data",
  extractFolder: "./ETL_export",
  logFileName: "extract_log.txt",
  patterns: [
    ["id", /"id":{"S":"([^"]*)"}/],
    // ["promotionId", /"promotionId":{"S":"([^"]*)"}/],
    // ["campaignId", /"campaignId":{"S":"([^"]*)"}/],
    // ["createdAt", /"createdAt":{"N":"([^"]*)"}/],
    // ["updatedAt", /"updatedAt":{"N":"([^"]*)"}/],
    // ["status", /"status":{"S":"([^"]*)"}/],
    // ["email", /"email":{"S":"([^"]*)"}/],
    // ["country", /"country":{"S":"([^"]*)"}/],
    // ["weight", /"weight":{"N":"([^"]*)"}/],
    // ["name", /"name":{"S":"([^"]*)"}/],
    // ["createdBy", /"createdBy":{"S":"([^"]*)"}/],
    // ["teams", /"teams":{"L":\[([^\]]*)\]}/],
    // ["artist", /"artist":{"M":{(.*)}},/],
    // ["featuredArtists", /"featuredArtists":{"L":\[([^\]]*)\]}/],
    // ["description", /"description":{"S":"([^"]*)"}/],
    // ["published", /"published":{"S":"([^"]*)"}/],
    // ["unpublished", /"unpublished":{"BOOL":([^}]*)}/],
    // ["templateType", /"templateType":{"S":"([^"]*)"}/],
    // ["templateOption", /"templateOption":{"S":"([^"]*)"}/],
    // ["clonedFrom", /"clonedFrom":{"S":"([^"]*)"}/],
    // ["promotionType", /"promotionType":{"S":"([^"]*)"}/],
    // ["widgets", /"widgets":{"L":\[([^\]]*)\]}/],
    // ["territory", /"territory":{"S":"(.*)"},"favIconUrl/], // JSON //
    // ["createdDate", /"createdDate":{"N":"([^"]*)"}/],
    // ["lastUpdated", /"lastUpdated":{"N":"([^"]*)"}/],
    // ["lastUpdatedBy", /"lastUpdatedBy":{"S":"([^"]*)"}/],
    // ["launchDate", /"launchDate":{"N":"([^"]*)"}/],
    // ["endDate", /"endDate":{"N":"([^"]*)"}/],
    // ["themeObject", /"themeObject":{"S":"(.*)"},"endDate"/], // JSON //
    // ["css", /"css":{"S":"([^"]*)"}/],
    // ["router", /"router":{"S":"(.*)"},"widgets"/], // JSON //
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
