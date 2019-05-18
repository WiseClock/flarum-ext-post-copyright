<?php

namespace WiseClock\PostCopyright\Listeners;

use Flarum\Post\Event\Saving;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Events\Dispatcher;

class SavingListener
{
    protected $settings;

    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function subscribe(Dispatcher $events)
    {
        $events->listen(Saving::class, [$this, 'postWillBeSaved']);
    }

    public function postWillBeSaved(Saving $event)
    {
        $allowSetCopyright = true;
        $allowTrespass = false;
        if ($this->settings->get('jc-proplus.post-copyright.allow_trespass') !== null)
            $allowTrespass = boolval($this->settings->get('jc-proplus.post-copyright.allow_trespass'));
        $postUserId = $event->post['attributes']['user_id'];
        if (isset($event->post['attributes']['edit_user_id']))
        {
            $postEditUserId = $event->post['attributes']['edit_user_id'];
            if ($postUserId != $postEditUserId && !$allowTrespass)
                $allowSetCopyright = false;
        }

        if (isset($event->data['attributes']['copyright']) && $allowSetCopyright)
        {
            $tmp = $event->data['attributes']['copyright'];
            $event->post->copyright = $tmp;
        }
    }
}
