const SUPPORTED_FILE_TYPES = {
	"image/jpg": true,
	"image/jpeg": true,
	"image/png": true
};

export function isValidImageFileType(type: string) {
	return type in SUPPORTED_FILE_TYPES;
}
