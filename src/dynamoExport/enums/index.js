const ErrorTypes = {
  Error: 'Error',
  Warn:'Warn',
  Debug: 'Debug',
};

const ResourceTypes = {
  ASSET:'asset',
  CAMPAIGN: 'campaign',
  DRAW:'draw',
  PAGE: 'page',
  TEAM: 'team',
  USER: 'user',
  MEDIA_LIBRARY: 'media-library',
  MEDIA_LIBRARY_ASSET: 'media-library-asset',
  PROMOTIONS: 'promotions',
  REINDEX: 'reindex'
};

const SortOrder = {
  Ascending: 'ASC',
  Decending: 'DESC'
};

// The order that appears below is the order of importance.s
const Role = {
  DEVELOPER: 'developer',
  SUPER_ADMIN:'super_admin',
  ADMIN: 'admin',
  ['LABEL MANAGER']: 'labelManager',
  MARKETER: 'marketer'
};

const PrivilegeTypes = {
  READ: 'read',
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  ALL: 'all'
};

const Publish = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived'
};

const PublishJobStatus = {
  NOT_STARTED: 'NotStarted', // this is a custom status set when publish was never triggered
  COMPLETED: 'True', // tekton returns True when the job is successful
  FAILED: 'False', // tekton returns False when the job fails
  PROCESSING: 'Unknown', // tekton returns processing as unknown
};

const PromotionTypeEnum = {
  NO_PROMOTION: 'NO_PROMOTION',
  SURPRISE_AND_DELIGHT: 'SURPRISE_AND_DELIGHT',
  SWEEPSTAKES: 'SWEEPSTAKES',
};

const UserStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  ACCESS_REQUESTED: 'access-requested'
};

const Theme = {
  COLORS: 'colors',
  DENSITY: 'density',
  FONT_BASE_SIZE: 'fontBaseSize',
  FONTS_BODY: 'fonts.body',
  FONTS_HEADING: 'fonts.heading',
  FONT_WEIGHTS_HEADING: 'fontWeights.heading',
  FONT_WEIGHTS_BODY: 'fontWeights.body'
};
const AssetTypes = {
  AUDIO: 'audio',
  FONT: 'font',
  GIF: 'gif',
  ICON: 'icon',
  IMAGE: 'image',
  PDF: 'pdf',
  SVG: 'svg',
  VIDEO: 'video',
};

const AssetSubTypes = {
  ASSET: 'ASSET',
  AUDIO: 'AUDIO',
  BACKGROUNDIMAGE: 'BACKGROUNDIMAGE',
  BACKGROUNDVIDEO: 'BACKGROUNDVIDEO',
  COLLECTION_IMAGE: 'COLLECTION_IMAGE',
  DOCUMENT: 'DOCUMENT',
  FONT: 'FONT',
  ICON: 'ICON',
  IMAGE: 'IMAGE',
  PROMO_RULES: 'PROMO_RULES',
  SHAREIMAGE: 'SHAREIMAGE',
  STICKER: 'STICKER',
  VIDEO: 'VIDEO',
};

const UserFieldTypes = {
  EMAIL: 'EMAIL',
  NAME: 'NAME',
  STATUS: 'STATUS',
  TEAM: 'TEAM',
  USER: 'USER',
  BUILDER_ID: 'BUILDER_ID'
};

const CampaignFieldTypes = {
  NAME: 'NAME',
  STATUS: 'STATUS',
  TEAM: 'TEAM'
};

const TeamFieldTypes = {
  PARENT: 'PARENT',
  NAME: 'NAME',
  STATUS: 'STATUS',
  TEAM: 'TEAM',
  TEAMS: 'TEAMS'
};
const CollectionStatus = {
  PUBLISHED: 'PUBLISHED',
  UNPUBLISHED:'UNPUBLISHED'
};
const DropStatus = {
  PUBLISHED: 'PUBLISHED',
  UNPUBLISHED:'UNPUBLISHED',
  LOCKED: 'LOCKED'
};
const DropSavesStatus = {
  SCHEDULED: 'SCHEDULED',
  IMMEDIATELY: 'IMMEDIATELY',
};

const DRAW_BONUS_ENTRY_DELIMITER = '|';

const CollectionIndex = {
  SLUG_GSI: 'slug-gsi',
  SLUG_VERSION_INDEX: 'slug-version-index',
  PAGE_ID_INDEX: 'page-id-index',
  VERSION_INDEX: 'version-index',
  PUBLISHED_VERSION_INDEX: 'published-version-index',
  CAMPAIGN_ID_INDEX: 'campaign-id-index',
  SLUG_CAMPAIGN_ID_PUBLISHED_INDEX: 'slug-campaign-id-published-index',
};

const PagesStatus = {
  ACTIVE: 'ACTIVE',
  DELETED: 'DELETED'
};

module.exports = {
  DRAW_BONUS_ENTRY_DELIMITER,
  Role,
  Publish,
  PublishJobStatus,
  PromotionTypeEnum,
  ErrorTypes,
  UserStatus,
  Theme,
  AssetTypes,
  AssetSubTypes,
  CampaignFieldTypes,
  TeamFieldTypes,
  UserFieldTypes,
  ResourceTypes,
  PrivilegeTypes,
  CollectionStatus,
  DropStatus,
  DropSavesStatus,
  SortOrder,
  CollectionIndex,
  PagesStatus
};
