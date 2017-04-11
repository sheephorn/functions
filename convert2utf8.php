<?php

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
                    echo "\n" ;
                    $command = 'nkf32.exe -w --overwrite ' . $path;
                    echo $command;
                    exec($command);
                }
            }
        }
    }
