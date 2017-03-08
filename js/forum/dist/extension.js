System.register('wiseclock/flarum-ext-post-copyright/main', ['flarum/extend', 'flarum/app', 'flarum/models/Post', 'flarum/Model', 'flarum/components/CommentPost', 'flarum/components/DiscussionComposer', 'flarum/components/EditPostComposer', 'flarum/components/ReplyComposer', 'flarum/components/TextEditor', 'flarum/components/Select'], function (_export) {
    'use strict';

    var extend, override, app, Post, Model, CommentPost, DiscussionComposer, EditPostComposer, ReplyComposer, TextEditor, Select;
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

                var wiseclockCopyrightOptions = {
                    'sourced': app.translator.trans('wiseclock-post-copyright.forum.composer.sourced'),
                    'authorized': app.translator.trans('wiseclock-post-copyright.forum.composer.authorized'),
                    'paid': app.translator.trans('wiseclock-post-copyright.forum.composer.paid'),
                    'prohibited': app.translator.trans('wiseclock-post-copyright.forum.composer.prohibited')
                };
                var wiseclockCopyrightShown = {
                    'sourced': app.translator.trans('wiseclock-post-copyright.forum.post.sourced'),
                    'authorized': app.translator.trans('wiseclock-post-copyright.forum.post.authorized'),
                    'paid': app.translator.trans('wiseclock-post-copyright.forum.post.paid'),
                    'prohibited': app.translator.trans('wiseclock-post-copyright.forum.post.prohibited')
                };

                extend(DiscussionComposer.prototype, 'init', function (items) {
                    var _editor = this.editor;
                    _editor.props.copyright = {};
                    _editor.props.copyright.options = wiseclockCopyrightOptions;
                    _editor.props.copyright.value = m.prop('authorized');
                });
                extend(EditPostComposer.prototype, 'init', function (items) {
                    var _editor = this.editor;
                    _editor.props.copyright = {};
                    _editor.props.copyright.options = wiseclockCopyrightOptions;
                    _editor.props.copyright.value = m.prop(this.props.post.data.attributes.copyright);
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
                        var copyrightString = wiseclockCopyrightShown[this.props.post.data.attributes.copyright];
                        list.push(m('div.Copyright-wrapper', m.trust(copyrightString)));
                    }
                });

                extend(TextEditor.prototype, 'controlItems', function (items) {
                    var _editor = this;

                    if (!_editor.props.copyright) {
                        _editor.props.copyright = {};
                        _editor.props.copyright.options = wiseclockCopyrightOptions;
                        _editor.props.copyright.value = m.prop(Object.keys(wiseclockCopyrightOptions)[0]);
                    }

                    var dropdown = Select.component({
                        options: _editor.props.copyright.options,
                        onchange: _editor.props.copyright.value,
                        value: _editor.props.copyright.value() || Object.keys(wiseclockCopyrightOptions)[0]
                    });

                    items.add('wiseclock-post-copyright-selector', dropdown, 0);
                });
            });
        }
    };
});