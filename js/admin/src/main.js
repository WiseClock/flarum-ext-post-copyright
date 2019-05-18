import { extend } from 'flarum/extend';
import app from 'flarum/app';

import PostCopyrightSettingsModal from 'jc-proplus/post-copyright/components/PostCopyrightSettingsModal';

app.initializers.add('jc-proplus-post-copyright', () =>
{
    app.extensionSettings['jc-proplus-post-copyright'] = () => app.modal.show(new PostCopyrightSettingsModal());
});
