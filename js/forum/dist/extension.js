System.register('jc-proplus/post-copyright/main', ['flarum/extend', 'flarum/app', 'flarum/models/Post', 'flarum/Model', 'flarum/components/HeaderPrimary', 'flarum/components/DiscussionPage', 'flarum/components/CommentPost', 'flarum/components/DiscussionComposer', 'flarum/components/EditPostComposer', 'flarum/components/ReplyComposer', 'flarum/components/TextEditor', 'flarum/components/Select'], function (_export) {
    'use strict';

    var extend, override, app, Post, Model, HeaderPrimary, DiscussionPage, CommentPost, DiscussionComposer, EditPostComposer, ReplyComposer, TextEditor, Select;
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
        }, function (_flarumComponentsDiscussionPage) {
            DiscussionPage = _flarumComponentsDiscussionPage['default'];
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

            app.initializers.add('jc-proplus-post-copyright', function () {
                Post.prototype.copyright = Model.attribute('copyright');

                function getDefaults(index) {
                    var dbValString = app.forum.attribute('jc-proplus.post-copyright.defaults');
                    var dbVal;
                    if (dbValString === null) dbVal = [true, true, true, true];else dbVal = JSON.parse(dbValString);
                    return dbVal[index];
                }

                var WiseClockCopyrightOptions = {
                    'sourced': app.translator.trans('jc-proplus-post-copyright.forum.composer.sourced'),
                    'authorized': app.translator.trans('jc-proplus-post-copyright.forum.composer.authorized'),
                    'paid': app.translator.trans('jc-proplus-post-copyright.forum.composer.paid'),
                    'prohibited': app.translator.trans('jc-proplus-post-copyright.forum.composer.prohibited'),
                    'none': app.translator.trans('jc-proplus-post-copyright.forum.composer.none')
                };
                var WiseClockCopyrightShown = {
                    'sourced': app.translator.trans('jc-proplus-post-copyright.forum.post.sourced'),
                    'authorized': app.translator.trans('jc-proplus-post-copyright.forum.post.authorized'),
                    'paid': app.translator.trans('jc-proplus-post-copyright.forum.post.paid'),
                    'prohibited': app.translator.trans('jc-proplus-post-copyright.forum.post.prohibited')
                };

                var WiseClockCopyrightAvailableOptions = {};
                var WiseClockCopyrightAvailableShown = {};
                var WiseClockCopyrightPrimaryColor = false;
                var WiseClockCopyrightAlignRight = false;
                var WiseClockCopyrightDiscussionsOnly = false;
                var WiseClockCopyrightAllowTrespass = false;
                var WiseClockCopyrightIcon = '© ';

                extend(HeaderPrimary.prototype, 'init', function () {
                    if (app.forum.attribute('jc-proplus.post-copyright.primary_color') !== null) WiseClockCopyrightPrimaryColor = JSON.parse(app.forum.attribute('jc-proplus.post-copyright.primary_color'));

                    if (app.forum.attribute('jc-proplus.post-copyright.discussions_only') !== null) WiseClockCopyrightDiscussionsOnly = JSON.parse(app.forum.attribute('jc-proplus.post-copyright.discussions_only'));

                    if (app.forum.attribute('jc-proplus.post-copyright.align_right') !== null) WiseClockCopyrightAlignRight = JSON.parse(app.forum.attribute('jc-proplus.post-copyright.align_right'));

                    if (app.forum.attribute('jc-proplus.post-copyright.icon') !== null) WiseClockCopyrightIcon = app.forum.attribute('jc-proplus.post-copyright.icon');

                    if (app.forum.attribute('jc-proplus.post-copyright.allow_trespass') !== null) WiseClockCopyrightAllowTrespass = JSON.parse(app.forum.attribute('jc-proplus.post-copyright.allow_trespass'));

                    if (app.forum.attribute('jc-proplus.post-copyright.addition') !== null) {
                        var additions = app.forum.attribute('jc-proplus.post-copyright.addition');
                        var additionLines = additions.match(/[^\r\n]+/g);
                        additionLines.forEach(function (element, index) {
                            var optionComponents = element.match(/([^\\\][^,]|\\,)+/g);
                            if (optionComponents.length == 3) {
                                var optionKey = optionComponents[0];
                                var optionMenu = optionComponents[1];
                                var optionUI = optionComponents[2];
                                WiseClockCopyrightAvailableOptions[optionKey] = optionMenu;
                                WiseClockCopyrightAvailableShown[optionKey] = optionUI;
                            }
                        });
                    }

                    var optionKeys = Object.keys(WiseClockCopyrightOptions);
                    optionKeys.forEach(function (key, index) {
                        if ((index >= 4 || getDefaults(index)) && !WiseClockCopyrightAvailableOptions.hasOwnProperty(key)) {
                            jc-proplusCopyrightAvailableOptions[key] = WiseClockCopyrightOptions[key];
                            if (key != 'none') WiseClockCopyrightAvailableShown[key] = WiseClockCopyrightShown[key];
                        }
                    });
                });

                extend(DiscussionComposer.prototype, 'init', function (items) {
                    var _editor = this.editor;
                    _editor.props.copyright = {};
                    _editor.props.copyright.options = WiseClockCopyrightAvailableOptions;
                    _editor.props.copyright.value = m.prop(Object.keys(WiseClockCopyrightAvailableOptions)[0]);
                });
                extend(EditPostComposer.prototype, 'init', function (items) {
                    var _editor = this.editor;
                    _editor.props.copyright = {};
                    _editor.props.copyright.options = WiseClockCopyrightAvailableOptions;
                    var copyrightKey = this.props.post.data.attributes.copyright;
                    if (!WiseClockCopyrightAvailableOptions.hasOwnProperty(copyrightKey)) copyrightKey = Object.keys(WiseClockCopyrightAvailableOptions)[0];
                    _editor.props.copyright.value = m.prop(copyrightKey);

                    if (app.current instanceof DiscussionPage) {
                        var discussionStartPost = app.current.stream.discussion.data.relationships.posts.data[0];
                        if (discussionStartPost.type == 'posts') {
                            var startPostId = discussionStartPost.id;
                            var currentPostId = this.props.post.id();
                            var isEditingStartPost = startPostId === currentPostId;
                            if (WiseClockCopyrightDiscussionsOnly && !isEditingStartPost) _editor.props.copyright.hidden = true;
                        }
                    }

                    var currentUserId = app.session.user.id();
                    var currentPostUserId = this.props.post.data.relationships.user.data.id;
                    if (!WiseClockCopyrightAllowTrespass && currentUserId != currentPostUserId) _editor.props.copyright.hidden = true;
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

                        var hidden = false;
                        if (app.current instanceof DiscussionPage) {
                            var discussionStartPost = app.current.stream.discussion.data.relationships.posts.data[0];
                            if (discussionStartPost.type == 'posts') {
                                var startPostId = discussionStartPost.id;
                                var currentPostId = this.props.post.id();
                                var isEditingStartPost = startPostId === currentPostId;
                                if (WiseClockCopyrightDiscussionsOnly && !isEditingStartPost) hidden = true;
                            }
                        }

                        if (hidden || copyrightKey == 'none' || !WiseClockCopyrightAvailableShown.hasOwnProperty(copyrightKey)) return;
                        var copyrightString = WiseClockCopyrightAvailableShown[copyrightKey];
                        var extraClass = '';
                        if (WiseClockCopyrightAlignRight) extraClass = ' Copyright-wrapper-right';
                        list.push(m('div.Copyright-wrapper' + extraClass, m.trust(WiseClockCopyrightIcon + copyrightString)));
                    }
                });

                extend(TextEditor.prototype, 'controlItems', function (items) {
                    var _editor = this;
                    var addDropdown = true;

                    if (!_editor.props.copyright) {
                        _editor.props.copyright = {};
                        _editor.props.copyright.options = WiseClockCopyrightAvailableOptions;
                        _editor.props.copyright.value = m.prop('none');

                        if (jc-proplusCopyrightDiscussionsOnly) _editor.props.copyright.hidden = true;
                    }

                    if (_editor.props.copyright.hidden) return;

                    var dropdown = Select.component({
                        options: _editor.props.copyright.options,
                        onchange: _editor.props.copyright.value,
                        value: _editor.props.copyright.value() || Object.keys(WiseClockCopyrightAvailableOptions)[0]
                    });

                    var extraClass = WiseClockCopyrightPrimaryColor ? ' Dropdown-primary' : '';
                    items.add('jc-proplus-post-copyright-selector' + extraClass, dropdown, 0);
                });
            });
        }
    };
});
