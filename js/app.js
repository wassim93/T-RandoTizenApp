/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function() {
    var reqAppControl = null;

    /**
     * Checks if the application was launched using the Application Control
     * @private
     */
    function checkAppControl() {
        try {
            // Get the requested application control passed to the current application
            reqAppControl = tizen.application.getCurrentApplication().getRequestedAppControl();

            if (reqAppControl && reqAppControl.appControl.operation === "http://tizen.org/appcontrol/operation/appcall") {
                // Display the information about the requested Application Control
                document.querySelector("#callee-intro").innerHTML = "<p>This application is called by <b>" + reqAppControl.callerAppId +
                    "</b><br>with operation: <b>" + reqAppControl.appControl.operation.replace("http://tizen.org/appcontrol/operation/", "") + "</b>";

                createIconTable();

                // Hide the Close button
                document.querySelector("#btn-close").style.display = "none";
            } else {
                // Display a message notifying that AppCallee only works properly when launched by AppCaller using the Application Control
                document.querySelector("#callee-intro").innerHTML = "The application was not launched with Application Control." +
                    "<br><br>This application only works when it is called by another application." +
                    "<br><br>Please launch it with the application &quot;appCaller&quot;.";

                // Hide the area for the icon table
                document.querySelector("#icon-table").style.display = "none";
            }
        } catch (error) {
            console.error("checkAppControl(): " + error.message);
        }
    }

    /**
     * Replies to the Caller application by passing data
     * @private
     * @param {Object} event - the object for click event
     */
    function replyToCaller(event) {
        var data = null,
            imgId = event.target.id;

        try {
            // Define the data in a key/value-pair format to be passed through the Application Control interface
            // The value must be a DOMString array
            data = new tizen.ApplicationControlData("text", [imgId]);

            // Pass the data to the Caller
            // The data must be an Object array
            reqAppControl.replyResult([data]);

            // Close the current application (AppCallee)
            tizen.application.getCurrentApplication().exit();
        } catch (e) {
            alert("Return failed. \n reason: " + e.message);
            console.error("return failed. reason: " + e.message);
        }
    }

    /**
     * Creates the table of the icon images
     * @private
     */
    function createIconTable() {
        var i,
            svgImgTag = "",
            svgIcon = [],
            ICON_N = 16;

        for (i = 1; i <= ICON_N; i++) {
            svgImgTag += "<img class='svg-icon' id='" + i + "' src='./image/" + i + ".svg'/>";
        }

        document.querySelector("#icon-table").innerHTML = "<p>Please choose an icon.</p>" + svgImgTag;

        svgIcon = document.querySelectorAll(".svg-icon");

        // Add event listener for every icon so that when it is clicked, it will reply to the Caller
        for (i = 0; i < svgIcon.length; i++) {
            svgIcon[i].addEventListener("click", replyToCaller);
        }
    }


    /**
     * Sets default event listeners
     * @private
     */
    function setDefaultEvents() {
        document.querySelector("#btn-close").addEventListener("click", function() {
            try {
                tizen.application.getCurrentApplication().exit();
            } catch (error) {
                console.error("getCurrentApplication(): " + error.message);
            }
        });

        // Add eventListener for tizenhwkey
        document.addEventListener("tizenhwkey", function(e) {
            if (e.keyName === "back") {
                try {
                    tizen.application.getCurrentApplication().exit();
                } catch (error) {
                    console.error("getCurrentApplication(): " + error.message);
                }
            }
        });
    }

    /**
     * Initiates the application
     * @private
     */
    function init() {
        setDefaultEvents();

        checkAppControl();
    }

    window.onload = init;
}());
