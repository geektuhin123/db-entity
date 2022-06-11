import { getConnection } from 'typeorm';
import Asset from '../entity/Asset';

const now = () => Math.ceil(new Date().getTime() / 1000);

/**
 * Common Utilities
 */

const saveAssetRecord = (instance: any, assetType: string) => {
  const asset = new Asset();
  const { workspace, configuredBy } = instance.meta;
  asset.name = instance.name;
  asset.assetType = assetType;
  asset.assetId = instance.id;
  asset.status = instance.status;
  asset.createdBy = instance.createdBy;
  asset.updatedBy = instance.updatedBy;
  asset.createdAt = instance.createdAt;
  asset.updatedAt = instance.updatedAt;
  asset.tenantId = instance.tenantId;
  asset.workspaceId = instance.workspaceId;
  asset.workspaceName = workspace.name;
  asset.owner = configuredBy;
  getConnection().manager.save(asset);
};

export { now, saveAssetRecord };
