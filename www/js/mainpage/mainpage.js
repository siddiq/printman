
angular.module('starter.controllers')
.controller('MainPageCtrl', function($scope) {
    $scope.vm = {
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
        // openfile
        window.FilePicker.pickFile(function (url) {
            navigator.notifications.alert(url);
        }, function (error) {
            navigator.notifications.alert(error);
        })

    }
})
