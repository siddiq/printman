
angular.module('starter.controllers')
.controller('MainPageCtrl', function($scope) {
    $scope.vm = {
        doc: "",
        url: "..."
    };

    $scope.scanqr = function () {
        $scope.vm.url = ".";

        cordova.plugins.barcodeScanner.scan(
            function (result) {
                $scope.vm.url = result.text;
                $scope.$apply();

                // alert("We got a barcode\n" +
                //         "Result: " + result.text + "\n" +
                //         "Format: " + result.format + "\n" +
                //         "Cancelled: " + result.cancelled);

                window.open(result.text, '_system');
            },
            function (error) {
                alert("Scanning failed: " + error);
            },
            {
                "preferFrontCamera": false, // iOS and Android
                "showFlipCameraButton": true, // iOS and Android
                "prompt": "Place a QR inside the scan area", // supported on Android only
                "formats": "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
                "orientation": "landscape" // Android only (portrait|landscape), default unset so it rotates with the device
            }
        );
    };

    $scope.openfile = function () {
        $scope.vm.doc = ".";

        // openfile
        window.FilePicker.pickFile(function (url) {
            // upload now
            $scope.vm.doc = url;
            $scope.upload(url);

            navigator.notification.alert(url);
        }, function (error) {
            navigator.notification.alert(error);
        })

    }

    $scope.upload = function (fileURL) {

        // !! Assumes variable fileURL contains a valid URL to a text file on the device,
        //    for example, cdvfile://localhost/persistent/path/to/file.txt

        var win = function (r) {
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
        }

        var fail = function (error) {
            alert("An error has occurred: Code = " + error.code);
            console.log("upload error source " + error.source);
            console.log("upload error target " + error.target);
        }

        var options = new FileUploadOptions();
        options.fileKey = "file";
//        options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
        options.fileName = fileURL;
        options.mimeType = "text/plain";

        var params = {};
        params.value1 = "test";
        params.value2 = "param";

        options.params = params;

        var ft = new FileTransfer();
        ft.upload(fileURL, encodeURI("http://puliyal.com/printman/uploads"), win, fail, options);
    };
})
