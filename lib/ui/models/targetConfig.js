/*
 * Copyright 2014 BlackBerry Ltd.
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
var TargetConfig,
    server = require("../server");

TargetConfig = Backbone.Model.extend({
    getTargetConfig: function (callback) {
        var model = this;

        server.getTargetConfig({}, function (response) {
            model.set("targetConfig", response.config);
            callback(response);
        }, callback);
    },
    setTargetConfig: function (callback) {
        server.setTargetConfig(
            this.get("targetConfig"),
            callback,
            callback
        );
    }
});

module.exports = TargetConfig;