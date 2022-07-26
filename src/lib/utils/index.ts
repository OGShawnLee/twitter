import { isValidImageFileType } from "$lib/predicate";
import { isString } from "malachite-ui/predicate";

export function getImageFilePathURL(file: File) {
	return new Promise<string>((resolve, reject) => {
		if (!isValidImageFileType(file.type)) return reject("Invalid Image File");

		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = ({ target }) => {
			const imageResult = target?.result;
			if (isString(imageResult)) resolve(imageResult);
			else reject("Invalid Image");
		};
	});
}
