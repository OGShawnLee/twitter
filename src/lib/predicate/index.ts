export { isStringOrNull } from "./core";

const AUTH_ROUTES = Object.freeze({
	"/login": true,
	"/i/flow/login": true,
	"/i/flow/signup": true
});

const RESTRICTED_ROUTES = Object.freeze({
	"/home": true,
	"/settings": true,
	"/i/bookmarks": true,
	"/i/moment_maker": true,
	"/compose/tweet": true
});

const SUPPORTED_FILE_TYPES = {
	"image/jpg": true,
	"image/jpeg": true,
	"image/png": true
};

export function isAuthRoute(pathname: string) {
	return pathname in AUTH_ROUTES;
}

export function isRestrictedRoute(pathname: string) {
	return pathname in RESTRICTED_ROUTES;
}

export function isValidImageFileType(type: string) {
	return type in SUPPORTED_FILE_TYPES;
}
