<?php
// ディレクトリのパスを記述
$dirs = [
	'C:\xampp\htdocs\functions\csv',
	'C:\xampp\htdocs\functions\params',
];
$originDir = 'C:\xampp\htdocs\functions\origin';






// echo "\n";
//     foreach ($dirs as $dir) {
//         // ディレクトリの存在を確認し、ハンドルを取得
//         if( is_dir( $dir ) && $handle = opendir( $dir ) ) {
//             // ループ処理
//             while( ($file = readdir($handle)) !== false ) {
//                 // ファイルのみ取得
//                 if( filetype( $path = $dir .'\\'. $file ) === "file" ) {
//                     /********************
//
//                     各ファイルへの処理
//
//                     $file ファイル名
//                     $path ファイルのパス
//
// 					csvファイルの文字コードがUTF-8以外の場合、エンコードして上書き保存をする
//
//                     ********************/
// 					$data = file_get_contents($path);
// 					$encode = mb_detect_encoding($data);
// 					echo $encode. ' ' .$path . "\n";
// 					if ($encode !== 'UTF-8') {
// 						echo "convert \n";
// 						$convertData = mb_convert_encoding($data, 'UTF-8', 'ASCII,JIS,UTF-8,EUC-JP,SJIS');
// 						$head = date_create()->format('YmdHis_');
// 						file_put_contents($path, $convertData);
// 						// バックアップファイルの作成
// 						file_put_contents($originDir . '\\' . $head . $file, $convertData);
// 					} else {
// 						//
// 					}
//                     // $command = 'nkf32.exe -w --overwrite ' . $path;
//                     // echo $command;
// 					// echo "\n";
//                     // exec($command);
//                 }
//             }
//         }
//     }
// 	deleteOldFiles($originDir);
// 	echo "\n";

	class Conversion
	{
		const ROOT_DIR = 'C:\xampp\htdocs\functions\\';
		const BACKUP_DIR = 'origin';
		const LOG_PATH = 'log.txt';
		const DIRS = [
			'csv',
			'params',
		];

		public function convert2utf8()
		{
			echo "\n";
			    foreach (self::DIRS as $dir) {
			        // ディレクトリの存在を確認し、ハンドルを取得
			        if( is_dir( self::ROOT_DIR . $dir ) && $handle = opendir( self::ROOT_DIR . $dir ) ) {
			            // ループ処理
			            while( ($file = readdir($handle)) !== false ) {
			                // ファイルのみ取得
			                if( filetype( $path = self::ROOT_DIR . $dir .'\\'. $file ) === "file" ) {
			                    /********************

			                    各ファイルへの処理

			                    $file ファイル名
			                    $path ファイルのパス

								csvファイルの文字コードがUTF-8以外の場合、エンコードして上書き保存をする

			                    ********************/
								$data = file_get_contents($path);
								$encode = mb_detect_encoding($data);
								echo $encode. ' ' .$path . "\n";
								if ($encode !== 'UTF-8') {
									echo "convert \n";
									$convertData = mb_convert_encoding($data, 'UTF-8', 'ASCII,JIS,UTF-8,EUC-JP,SJIS');
									$head = date_create()->format('YmdHis_');
									// バックアップファイルの作成
									try {
										$log = "Create ". $head . $file . "\n";
										$this->createLog($log);
										file_put_contents(self::ROOT_DIR . self::BACKUP_DIR . '\\' . $head . $file, $convertData);
										// ファイルの書き換え
										file_put_contents($path, $convertData);
									} catch(Exception $e) {
										echo $e->getMessage() . "\n";
										exit;
									}
								} else {
									//
								}
			                    // $command = 'nkf32.exe -w --overwrite ' . $path;
			                    // echo $command;
								// echo "\n";
			                    // exec($command);
			                }
			            }
			        }
			    }
				$this->deleteOldFiles();
				echo "\n";
		}

		/**
		 * 古いバックアップファイルの削除
		 * バックアップフォルダ内の全ファイルにおいて
		 * 作成日から指定日数を超えたファイルを削除していく
		 */
		public function deleteOldFiles()
		{
			$today = date_create('2016-01-01');
			// $lifeDays 指定日数
			$lifeDays = 10;

			$handle = opendir( self::ROOT_DIR . self::BACKUP_DIR );
			while ( ($file = readdir( $handle )) !== false ) {
				if ( filetype( $path = self::ROOT_DIR . self::BACKUP_DIR .'\\'. $file ) === "file" ) {
					$diff = date_create(date('Ymd'))->diff($today)->format('%a');
					if ($diff > $lifeDays) {
						$log = "Delete {$file} \n";
						echo $log;
						$this->createLog($log);
						unlink($path);
					}
				}
			}
		}

		private function createLog($logStr)
		{
			$logFilePath = self::ROOT_DIR . self::LOG_PATH;
			if (file_exists($logFilePath)) {
				$log = file_get_contents($logFilePath);
				$log = $this->deleteOldLog($log) . "\n";
			} else {
				$log = '';
			}
			$now = date_create()->format('[Y-m-d H:i:s]');
			$log .= $now . $logStr;
			file_put_contents($logFilePath, $log);
			return true;
		}

		private function deleteOldLog($log)
		{
			$lifeDays = 30;
			$today = date_create();
			$rows = explode("\n", $log);
			$returnRows = $rows;
			foreach ($rows as $index => $row) {
				$date = substr($row, 1, 10);
				echo $date;
				$date = date_create($date)->diff($today)->format('%a');
				if ($date > 30) {
					$returnRows = array_splice($returnRows, $index, 1);
				} else {
					break;
				}
			}
			$log = implode("\n", $returnRows);
			return $log;
		}
	}

	$convert = new Conversion();
	$convert->convert2utf8();
