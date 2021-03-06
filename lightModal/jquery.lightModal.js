
  (function($) {
    var methods;
    methods = {
      init: function(options) {
        return this.each(function() {
          var $this, data, modalContainer, self;
          self = this;
          $this = $(this);
          data = $this.data('lightModal');
          if ($this.attr('href')) {
            modalContainer = $this.attr('href');
          } else {
            modalContainer = '#some_container';
          }
          this.options = $.extend({
            modalContainer: modalContainer,
            width: 'auto',
            closeButtonDisable: false,
            padding: 36,
            topMargin: 18,
            overlayDisable: false,
            overlayHtml: '<div class="light-modal-overlay"></div>',
            onShow: function() {},
            onHide: function() {}
          }, $this.data('lightModal') || {}, options || {});
          if (!data) {
            this.$modalContainer = $(this.options.modalContainer);
            this.$modalContainer.hide();
            this.$modalContainer.addClass('modal');
            if (this.options.width !== 'auto') {
              this.$modalContainer.width(this.options.width);
            }
            this.modalWidth = this.$modalContainer.width();
            this.$overlay = $(this.options.overlayHtml);
            this.$closeButton = $('<a>').text('Close').addClass('light-modal-close');
            return $this.click(function(e) {
              e.preventDefault();
              return $(this).lightModal('show');
            });
          }
        });
      },
      destroy: function() {
        return this.each(function() {
          var $this, data;
          $this = $(this);
          data = $this.data('lightModal');
          $(window).unbind('.lightModal');
          data.lightModal.remove();
          return $this.removeData('lightModal');
        });
      },
      show: function() {
        return this.each(function() {
          var $this;
          var _this = this;
          $this = $(this);
          this.$modalContainer.width(this.modalWidth - (this.options.padding * 2));
          this.$modalContainer.css('left', ($(window).width() - this.modalWidth) / 2 + 'px');
          this.$modalContainer.css('top', $(window).scrollTop() + this.options.topMargin + 'px');
          this.$modalContainer.css('padding', this.options.padding + 'px');
          if (!this.options.closeButtonDisable) {
            this.$modalContainer.prepend(this.$closeButton);
            this.$closeButton.click(function(e) {
              e.preventDefault();
              return $this.lightModal('hide');
            });
          }
          this.$overlay.appendTo('body').click(function(e) {
            e.preventDefault();
            if (_this.options.overlayDisable) return $this.lightModal('hide');
          });
          $(document).bind('keyup.lightModal', function(e) {
            if (e.keyCode === 27) return $this.lightModal('hide');
          });
          this.$modalContainer.slideDown();
          return this.options.onShow();
        });
      },
      hide: function() {
        return this.each(function() {
          var $this;
          $this = $(this);
          this.$modalContainer.slideUp();
          this.$overlay.remove();
          this.$closeButton.remove();
          $(document).unbind('keyup.lightModal');
          return this.options.onHide();
        });
      }
    };
    return $.fn.lightModal = function(method) {
      if (methods[method]) {
        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
      } else if (typeof method === 'object' || !method) {
        return methods.init.apply(this, arguments);
      } else {
        return $.error('Method ' + method + ' does not exist on jQuery.lightModal');
      }
    };
  })(jQuery);
