exports.filterUrl = (excludedUrls, requestedUrl) => {
	for (let i in excludedUrls) {
		if (excludedUrls[i] instanceof RegExp && excludedUrls[i].test(requestedUrl)) {
			return true;
		} else if (typeof excludedUrls[i] === 'string' && excludedUrls[i] === requestedUrl) {
			return true;
		}
	}
	return false;
};
