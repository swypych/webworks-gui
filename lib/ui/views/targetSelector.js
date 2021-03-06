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
var TargetSelectorView,
    targetSelectorTemplate;

TargetSelectorView = Backbone.View.extend({
    initialize: function () {
        // Find the template and save it
        $.get("pages/targetSelector.html", function (data) {
            targetSelectorTemplate = data;
        });
    },
    render: function () {
        // Use the template to create the html to display
        var view = this,
            buildSettings = view.model.get("buildSettings"),
            showDevices = !buildSettings || typeof buildSettings.device === "undefined" || buildSettings.device,
            template;

        this.model.targetFilter(showDevices, function (filteredTargets) {
            template = _.template(targetSelectorTemplate, {
                targetNameList: Object.keys(filteredTargets)
            });

            // Put the new html inside of the assigned element
            view.$el.html(template);
        });
    },
    events: {
    },
    display: function (model) {
        this.model = model;
        this.render();
    }
});

module.exports = TargetSelectorView;
