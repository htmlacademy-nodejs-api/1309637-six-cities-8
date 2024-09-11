type PackageJSONConfig = {
  version: string;
};

export const isPackageJSONConfig = (value: unknown): value is PackageJSONConfig => (
  typeof value === 'object' &&
  value !== null &&
  !Array.isArray(value) &&
  Object.hasOwn(value, 'version')
);
