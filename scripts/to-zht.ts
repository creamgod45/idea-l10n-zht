/**
 * Created by user on 2022/1/9.
 */

import { cn2tw_min } from '@lazy-cjk/zh-convert/min';
import { async as FastGlob } from '@bluelovers/fast-glob/bluebird';
import { __plugin_dev_dir, __plugin_downloaded_dir_unzip } from '../lib/const';
import { outputFile, pathExists, readFile, unlink } from 'fs-extra';
import { join } from 'upath2';
import { console } from 'debug-color2';
import { cli_logger } from '../lib/cli-progress';

cli_logger(FastGlob([
	'**/*',
], {
	cwd: __plugin_downloaded_dir_unzip,
})
	.each(async (file: string) =>
	{
		let fullpath_new = join(__plugin_dev_dir, file);

		if (!/\.(png)$/i.test(file))
		{
			let fullpath = join(__plugin_downloaded_dir_unzip, file);

			const content_old = await readFile(fullpath).then(content => content.toString());
			let content_new = cn2tw_min(content_old);

			if (/META-INF\/plugin\.xml$/i.test(file))
			{
				content_new = content_new.replace(/<name>.+<\/name>/, `<name>Chinese (Traditional) Language Pack / 中文語言包</name>`);
			}

			if (content_new !== content_old)
			{
				console.success(file);
				await outputFile(fullpath_new, content_new);
				return;
			}
		}

		if (await pathExists(fullpath_new))
		{
			console.warn(file);
			return unlink(fullpath_new);
		}
	}), `convert to zht`)
;

