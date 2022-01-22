import { processIdeaSegmentText } from '../lib/segment';

jest.setTimeout(60 * 1000);

/**
 * 檢查是否確實轉換
 */
describe(`segment`, () =>
{

	/**
	 * 繁體/簡體皆可 但簡體比較能反映真實運作
	 */
	[
		//[`繁體`, `繁體/簡體皆可 但簡體比較能反映真實運作`],

		[`打印`, `action.Print.text=打印(_P)…\naction.Print.description=打印文件`],
		[`粘貼`, `從剪貼板粘貼`],
		[`剪貼板`, `從剪貼板粘貼`],
		[`選項卡`, `編輯器選項卡`],
		[`選項卡`, `action.close.all.unmodified.editors=關閉未修改選項卡(_U)`],
		[`只讀`, `action.ToggleReadOnlyAttribute.text=切換只讀特性`],
		[`標籤頁`, `關閉組內未固定標籤頁`],
		[`標簽頁`, `關閉組內未固定標簽頁`],
		[`文件夾`, `，右击任何文件夹，`],
		[`文件夾`, `仅报告位於源文件夹下的空目录`],
		[`全局`, `使工具全局可见(&B)`],
		[`全局库`, `导入的项目引用了未知的全局库`],
		[`服務器`, `以下文件被禁止，因为其中一个文件很可能导致服务器崩溃。\n{0}`],
		[`屏幕`, `action.android.emulator.home.button.text=主屏幕`],
		[`搜索`, `正在搜索受影響的檔案路徑…`],
		[`查找`, `查找下一个/移至下一个匹配项(_N)…`],
		[`宏`, `无法解析宏 ''{1}'' 的形参 ''{0}''`],
		[`宏`, `查看、更改、录制、播放宏`],
		[`形參`, `類型形參 ''{0}'' 不能直接實例化`],
		[`應用程序`, `重新加載應用程序設定`],
		[`字符串`, `在活動編輯器中尋找字符串`],
		[`反方向`, `反方向重複上一次尋找`],
		[`圖像`, `圖像已複製到剪貼簿`],
		[`信息`, `顯示詳細信息`],
		[`數據源`, `外部數據源`],
		[`數據`, `刷新測試管理數據`],

	].forEach(text =>
	{

		test(text.join(' - '), async () =>
		{

			let actual = await processIdeaSegmentText(text[1]);

			expect(actual).not.toContain(text[0])
			expect(actual).toMatchSnapshot();

		});

	});

})

/**
 * 檢查是否發生誤轉換
 */
describe(`should include`, () =>
{

	[
		[`顯示`, `顯示屏幕外圖像`],
		[`頁面`, `打开文件或项目。您也可以通过拖放到欢迎屏幕来打开项目或编辑文件。`],
		[`頁面`, `显示初始屏幕`],
		[`原始碼`, `选择根源代码`],
		[`全域類別庫`, `导入的项目引用了未知的全局库`],
		[`執行巨集`, `查看、更改、录制、播放宏`],

	].forEach(text =>
	{

		test(text.join(' - '), async () =>
		{

			let actual = await processIdeaSegmentText(text[1]);

			expect(actual).toContain(text[0])
			expect(actual).toMatchSnapshot();

		});

	});

})
