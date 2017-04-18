<?php
echo "\n";
// ディレクトリのパスを記述
	$dirs = [
        'C:\xampp\htdocs\functions\csv',
        'C:\xampp\htdocs\functions\params',
    ];
    foreach ($dirs as $dir) {
        // ディレクトリの存在を確認し、ハンドルを取得
        if( is_dir( $dir ) && $handle = opendir( $dir ) ) {
            // ループ処理
            while( ($file = readdir($handle)) !== false ) {
                // ファイルのみ取得
                if( filetype( $path = $dir .'\\'. $file ) == "file" ) {
                    /********************

                    各ファイルへの処理

                    $file ファイル名
                    $path ファイルのパス

                    ********************/
					$data = file_get_contents($path);
					$encode = mb_detect_encoding($data);
					echo $encode. ' ' .$path . "\n";
					if ($encode !== 'UTF-8') {
						echo "convert \n";
						$data = mb_convert_encoding($data, 'UTF-8', 'ASCII,JIS,UTF-8,EUC-JP,SJIS');
						file_put_contents($path, $data);
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
	echo "\n";
