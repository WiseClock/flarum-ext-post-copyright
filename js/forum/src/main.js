import { extend, override } from 'flarum/extend';

import app from 'flarum/app';

import Post from 'flarum/models/Post';
import Model from 'flarum/Model';

import CommentPost from 'flarum/components/CommentPost';

import DiscussionComposer from 'flarum/components/DiscussionComposer';
import EditPostComposer from "flarum/components/EditPostComposer";
import ReplyComposer from "flarum/components/ReplyComposer";

import TextEditor from "flarum/components/TextEditor";
import Select from 'flarum/components/Select';

app.initializers.add('wiseclock-post-copyright', function()
{
    Post.prototype.copyright = Model.attribute('copyright');

    const wiseclockCopyrightOptions =
    {
        'sourced': app.translator.trans('wiseclock-post-copyright.forum.composer.sourced'),
        'authorized': app.translator.trans('wiseclock-post-copyright.forum.composer.authorized'),
        'paid': app.translator.trans('wiseclock-post-copyright.forum.composer.paid'),
        'prohibited': app.translator.trans('wiseclock-post-copyright.forum.composer.prohibited'),
    };
    const wiseclockCopyrightShown =
    {
        'sourced': app.translator.trans('wiseclock-post-copyright.forum.post.sourced'),
        'authorized': app.translator.trans('wiseclock-post-copyright.forum.post.authorized'),
        'paid': app.translator.trans('wiseclock-post-copyright.forum.post.paid'),
        'prohibited': app.translator.trans('wiseclock-post-copyright.forum.post.prohibited'),
    };

    extend(DiscussionComposer.prototype, 'init', function (items)
    {
        const _editor = this.editor;
        _editor.props.copyright = {};
        _editor.props.copyright.options = wiseclockCopyrightOptions;
        _editor.props.copyright.value = m.prop('authorized');
    });
    extend(EditPostComposer.prototype, 'init', function (items)
    {
        const _editor = this.editor;
        _editor.props.copyright = {};
        _editor.props.copyright.options = wiseclockCopyrightOptions;
        _editor.props.copyright.value = m.prop(this.props.post.data.attributes.copyright);
    });

    extend(EditPostComposer.prototype, 'data', function(data)
    {
        if (this.editor.props.copyright.value())
            data.copyright = this.editor.props.copyright.value();
    });
    extend(ReplyComposer.prototype, 'data', function(data)
    {
        if (this.editor.props.copyright.value())
            data.copyright = this.editor.props.copyright.value();
    });
    extend(DiscussionComposer.prototype, 'data', function(data)
    {
        if (this.editor.props.copyright.value())
            data.copyright = this.editor.props.copyright.value();
    });

    extend(CommentPost.prototype, 'content', function (list)
    {
        if (!this.isEditing())
        {
            var copyrightString = wiseclockCopyrightShown[this.props.post.data.attributes.copyright];
            list.push(m('div.Copyright-wrapper', m.trust(copyrightString)));
        }
    });

    extend(TextEditor.prototype, 'controlItems', function (items)
    {
        const _editor = this;

        if (!_editor.props.copyright)
        {
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
