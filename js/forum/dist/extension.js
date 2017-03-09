System.register('wiseclock/flarum-ext-post-copyright/main', ['flarum/extend', 'flarum/app', 'flarum/models/Post', 'flarum/Model', 'flarum/components/HeaderPrimary', 'flarum/components/CommentPost', 'flarum/components/DiscussionComposer', 'flarum/components/EditPostComposer', 'flarum/components/ReplyComposer', 'flarum/components/TextEditor', 'flarum/components/Select'], function (_export) {
    'use strict';

    var extend, override, app, Post, Model, HeaderPrimary, CommentPost, DiscussionComposer, EditPostComposer, ReplyComposer, TextEditor, Select;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
            override = _flarumExtend.override;
        }, function (_flarumApp) {
            app = _flarumApp['default'];
        }, function (_flarumModelsPost) {
            Post = _flarumModelsPost['default'];
        }, function (_flarumModel) {
            Model = _flarumModel['default'];
        }, function (_flarumComponentsHeaderPrimary) {
            HeaderPrimary = _flarumComponentsHeaderPrimary['default'];
        }, function (_flarumComponentsCommentPost) {
            CommentPost = _flarumComponentsCommentPost['default'];
        }, function (_flarumComponentsDiscussionComposer) {
            DiscussionComposer = _flarumComponentsDiscussionComposer['default'];
        }, function (_flarumComponentsEditPostComposer) {
            EditPostComposer = _flarumComponentsEditPostComposer['default'];
        }, function (_flarumComponentsReplyComposer) {
            ReplyComposer = _flarumComponentsReplyComposer['default'];
        }, function (_flarumComponentsTextEditor) {
            TextEditor = _flarumComponentsTextEditor['default'];
        }, function (_flarumComponentsSelect) {
            Select = _flarumComponentsSelect['default'];
        }],
        execute: function () {

            app.initializers.add('wiseclock-post-copyright', function () {
                Post.prototype.copyright = Model.attribute('copyright');

                function getDefaults(index) {
                    var dbValString = app.forum.attribute('wiseclock.post-copyright.defaults');
                    var dbVal;
                    if (dbValString === null) dbVal = [true, true, true, true];else dbVal = JSON.parse(dbValString);
                    return dbVal[index];
                }

                var wiseclockCopyrightOptions = {
                    'sourced': app.translator.trans('wiseclock-post-copyright.forum.composer.sourced'),
                    'authorized': app.translator.trans('wiseclock-post-copyright.forum.composer.authorized'),
                    'paid': app.translator.trans('wiseclock-post-copyright.forum.composer.paid'),
                    'prohibited': app.translator.trans('wiseclock-post-copyright.forum.composer.prohibited'),
                    'none': app.translator.trans('wiseclock-post-copyright.forum.composer.none')
                };
                var wiseclockCopyrightShown = {
                    'sourced': app.translator.trans('wiseclock-post-copyright.forum.post.sourced'),
                    'authorized': app.translator.trans('wiseclock-post-copyright.forum.post.authorized'),
                    'paid': app.translator.trans('wiseclock-post-copyright.forum.post.paid'),
                    'prohibited': app.translator.trans('wiseclock-post-copyright.forum.post.prohibited')
                };

                var wiseclockCopyrightAvailableOptions = {};
                var wiseclockCopyrightAvailableShown = {};
                var wiseclockCopyrightPrimaryColor = false;

                extend(HeaderPrimary.prototype, 'init', function () {
                    if (app.forum.attribute('wiseclock.post-copyright.primary_color') !== null) wiseclockCopyrightPrimaryColor = JSON.parse(app.forum.attribute('wiseclock.post-copyright.primary_color'));

                    if (app.forum.attribute('wiseclock.post-copyright.addition') !== null) {
                        var additions = app.forum.attribute('wiseclock.post-copyright.addition');
                        var additionLines = additions.match(/[^\r\n]+/g);
                        additionLines.forEach(function (element, index) {
                            var optionComponents = element.match(/([^\\\][^,]|\\,)+/g);
                            if (optionComponents.length == 3) {
                                var optionKey = optionComponents[0];
                                var optionMenu = optionComponents[1];
                                var optionUI = optionComponents[2];
                                wiseclockCopyrightAvailableOptions[optionKey] = optionMenu;
                                wiseclockCopyrightAvailableShown[optionKey] = optionUI;
                            }
                        });
                    }

                    var optionKeys = Object.keys(wiseclockCopyrightOptions);
                    optionKeys.forEach(function (key, index) {
                        if ((index >= 4 || getDefaults(index)) && !wiseclockCopyrightAvailableOptions.hasOwnProperty(key)) {
                            wiseclockCopyrightAvailableOptions[key] = wiseclockCopyrightOptions[key];
                            if (key != 'none') wiseclockCopyrightAvailableShown[key] = wiseclockCopyrightShown[key];
                        }
                    });
                });

                extend(DiscussionComposer.prototype, 'init', function (items) {
                    var _editor = this.editor;
                    _editor.props.copyright = {};
                    _editor.props.copyright.options = wiseclockCopyrightAvailableOptions;
                    _editor.props.copyright.value = m.prop(Object.keys(wiseclockCopyrightAvailableOptions)[0]);
                });
                extend(EditPostComposer.prototype, 'init', function (items) {
                    var _editor = this.editor;
                    _editor.props.copyright = {};
                    _editor.props.copyright.options = wiseclockCopyrightAvailableOptions;
                    var copyrightKey = this.props.post.data.attributes.copyright;
                    if (!wiseclockCopyrightAvailableOptions.hasOwnProperty(copyrightKey)) copyrightKey = Object.keys(wiseclockCopyrightAvailableOptions)[0];
                    _editor.props.copyright.value = m.prop(copyrightKey);
                });

                extend(EditPostComposer.prototype, 'data', function (data) {
                    if (this.editor.props.copyright.value()) data.copyright = this.editor.props.copyright.value();
                });
                extend(ReplyComposer.prototype, 'data', function (data) {
                    if (this.editor.props.copyright.value()) data.copyright = this.editor.props.copyright.value();
                });
                extend(DiscussionComposer.prototype, 'data', function (data) {
                    if (this.editor.props.copyright.value()) data.copyright = this.editor.props.copyright.value();
                });

                extend(CommentPost.prototype, 'content', function (list) {
                    if (!this.isEditing()) {
                        var copyrightKey = this.props.post.data.attributes.copyright;
                        if (copyrightKey == 'none' || !wiseclockCopyrightAvailableShown.hasOwnProperty(copyrightKey)) return;
                        var copyrightString = wiseclockCopyrightAvailableShown[copyrightKey];
                        list.push(m('div.Copyright-wrapper', m.trust(copyrightString)));
                    }
                });

                extend(TextEditor.prototype, 'controlItems', function (items) {
                    var _editor = this;
                    var addDropdown = true;

                    if (!_editor.props.copyright) {
                        _editor.props.copyright = {};
                        _editor.props.copyright.options = wiseclockCopyrightAvailableOptions;
                        _editor.props.copyright.value = m.prop('none');
                    }

                    var dropdown = Select.component({
                        options: _editor.props.copyright.options,
                        onchange: _editor.props.copyright.value,
                        value: _editor.props.copyright.value() || Object.keys(wiseclockCopyrightAvailableOptions)[0]
                    });

                    var extraClass = wiseclockCopyrightPrimaryColor ? ' Dropdown-primary' : '';
                    items.add('wiseclock-post-copyright-selector' + extraClass, dropdown, 0);
                });
            });
        }
    };
});