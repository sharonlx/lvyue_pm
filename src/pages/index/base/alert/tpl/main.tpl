<div v-show="show" transition="fade" class="msgbox fast">
    <div class="mask"></div>
    <div class="alert-wrapper">
        <div class="content-wrapper">
            <div class="content">
                {{content}}
            </div>
        </div>
        <div class="btn-area" @touchstart="clickOK">
            确定
        </div>
    </div>
</div>
