const config = {
  aggregatedExport: true,
  files:[
    // "laurent_test.json"
    "file1.json",
    "file2.json",
    "file3.json",
    "file4.json",
  ],
  sourceFolder: "./data",
  extractFolder: "./ETL_export",
  logFileName: "extract_log.txt",
  patterns: [
    ["createdAt", /"createdAt":{"N":"([^"]*)"}/],
    ["id", /"id":{"S":"([^"]*)"}/],
    ["name", /"name":{"S":"([^"]*)"}/],
    ["createdBy", /"createdBy":{"S":"([^"]*)"}/],
    ["teams", /"teams":{"L":\[([^\]]*)\]}/],
    ["artist", /"artist":{"M":({.*?}})},/],
    ["artist_name", /"artist":{"M":{.*"name":{"S":"([^"]*?)"}/],
    ["partyId", /"artist":{"M":{.*"partyId":{"S":"([^"]*?)"}/],
    ["canopusId", /"artist":{"M":{.*"canopusId":{"S":"([^"]*?)"}/],
    ["featuredArtists", /"featuredArtists":{"L":\[([^\]]*)\]}/],
    ["description", /"description":{"S":"([^"]*)"}/],
    ["published", /"published":{"S":"([^"]*)"}/],
    ["unpublished", /"unpublished":{"BOOL":([^}]*)}/],
    ["templateType", /"templateType":{"S":"([^"]*)"}/],
    ["templateOption", /"templateOption":{"S":"([^"]*)"}/],
    ["clonedFrom", /"clonedFrom":{"S":"([^"]*)"}/],
    ["promotionType", /"promotionType":{"S":"([^"]*)"}/],
    ["widgets", /"widgets":{"L":\[([^\]]*)\]}/],
    ["territory", /"territory":{"S":"(.*)"},"favIconUrl/], // JSON //
    ["createdDate", /"createdDate":{"N":"([^"]*)"}/],
    ["lastUpdated", /"lastUpdated":{"N":"([^"]*)"}/],
    ["lastUpdatedBy", /"lastUpdatedBy":{"S":"([^"]*)"}/],
    ["launchDate", /"launchDate":{"N":"([^"]*)"}/],
    ["endDate", /"endDate":{"N":"([^"]*)"}/],
    ["themeObject", /"themeObject":{"S":"(.*)"},"endDate"/], // JSON //
    ["css", /"css":{"S":"([^"]*)"}/],
    ["router", /"router":{"S":"(.*?})"},?/], // JSON //
    ["domain", /"router":{"S":.*"domain\\":\\"(.*?)\\",?/],
    ["isCustom", /"router":{"S":.*"customDomainActive\\":(.*?),/],
    ["path", /"path":{"L":\[([^\]]*)\]}/],
    ["slug", /"slug":{"S":"([^"]*)"}/],
  ],
  conditionalToExclude: (data) => {
    return Number(data[0])  < 1704096000000
  },
  postProcess: (data) => {
    return data
  }
}

module.exports = config;
