!(function (l) {
	"use strict";

	function e() {
		(this.$body = l("body")),
			(this.$modal = l("#event-modal")),
			(this.$calendar = l("#calendar")),
			(this.$formEvent = l("#form-event")),
			(this.$btnNewEvent = l("#btn-new-event")),
			(this.$btnDeleteEvent = l("#btn-delete-event")),
			(this.$btnSaveEvent = l("#btn-save-event")),
			(this.$modalTitle = l("#modal-title")),
			(this.$calendarObj = null),
			(this.$selectedEvent = null),
			(this.$newEventData = null);
	}
	(e.prototype.onEventClick = function (e) {
		this.$formEvent[0].reset(),
			this.$formEvent.removeClass("was-validated"),
			(this.$newEventData = null),
			this.$btnDeleteEvent.show(),
			this.$modalTitle.text("Edit Event"),
			this.$modal.modal({ backdrop: "static" }),
			(this.$selectedEvent = e.event),
			l("#event-title").val(this.$selectedEvent.title),
			l("#event-category").val(this.$selectedEvent.classNames[0]);
	}),
		(e.prototype.onSelect = function (e) {
			this.$formEvent[0].reset(),
				this.$formEvent.removeClass("was-validated"),
				(this.$selectedEvent = null),
				(this.$newEventData = e),
				this.$btnDeleteEvent.hide(),
				this.$modalTitle.text("Add New Event"),
				this.$modal.modal({ backdrop: "static" }),
				this.$calendarObj.unselect();
		}),
		(e.prototype.init = function () {
			var e = new Date(l.now());
			new FullCalendar.Draggable(document.getElementById("external-events"), {
				itemSelector: ".external-event",
				eventData: function (e) {
					return { title: e.innerText, className: l(e).data("class") };
				},
			});
			var t = [
					{
						title: "박정연",
						start: new Date(2020, 12, 4),
						className: "bg-cal-dim",
					},
					{
						title: "최진성",
						start: new Date(2020, 12, 4),
						className: "bg-cal-dim",
					},
					{
						title: "최진성",
						start: new Date(2020, 12, 4),
						className: "bg-cal-success",
					},
					{
						title: "최진성",
						start: new Date(2020, 12, 10),
						className: "bg-cal-dim",
					},
					{
						title: "최진성",
						start: new Date(2020, 12, 10),
						className: "bg-cal-warning",
					},
					{
						title: "최진성",
						start: new Date(2020, 12, 10),
						className: "bg-cal-success",
					},
					{
						title: "최진성",
						start: new Date(2020, 12, 10),
						className: "bg-cal-info",
					},
					{
						title: "이주회",
						start: new Date(2020, 12, 10),
						className: "bg-cal-dim",
					},
					{
						title: "이주회",
						start: new Date(2020, 12, 8),
						className: "bg-cal-warning",
					},
					{
						title: "이주회",
						start: new Date(2020, 12, 8),
						className: "bg-cal-warning",
					},
					{
						title: "이주회",
						start: new Date(2020, 12, 8),
						className: "bg-cal-warning",
					},
					{
						title: "이주회",
						start: new Date(2020, 12, 8),
						className: "bg-cal-info",
					},
					{
						title: "이주회",
						start: new Date(2020, 12, 8),
						className: "bg-cal-info",
					},
					{
						title: "이주회",
						start: new Date(2020, 12, 8),
						className: "bg-cal-info",
					},
					{
						title: "이주회",
						start: new Date(2020, 12, 8),
						className: "bg-cal-dim",
					},
					{
						title: "이주회",
						start: new Date(2020, 12, 13),
						className: "bg-cal-success",
					},
					{
						title: "최진성",
						start: new Date(2020, 12, 13),
						className: "bg-cal-success",
					},
					{
						title: "최진성",
						start: new Date(2020, 12, 14),
						className: "bg-cal-info",
					},
				],
				a = this;
			(a.$calendarObj = new FullCalendar.Calendar(a.$calendar[0], {
				slotDuration: "00:15:00",
				slotMinTime: "08:00:00",
				slotMaxTime: "19:00:00",
				themeSystem: "bootstrap",
				bootstrapFontAwesome: !1,
				buttonText: {
					today: "Today",
					month: "Month",
					week: "Week",
					day: "Day",
					list: "List",
					prev: "Prev",
					next: "Next",
				},
				initialView: "dayGridMonth",
				handleWindowResize: !0,
				height: l(window).height() - 200,
				headerToolbar: {
					left: "prev,next today",
					center: "title",
					right: "dayGridMonth,timeGridWeek,timeGridDay",
				},
				initialEvents: t,
				editable: false,
				droppable: !0,
				selectable: !0,
				dateClick: function (e) {
					a.onSelect(e);
				},
				eventClick: function (e) {
					a.onEventClick(e);
				},
			})),
				a.$calendarObj.render(),
				a.$btnNewEvent.on("click", function (e) {
					a.onSelect({ date: new Date(), allDay: !0 });
				}),
				a.$formEvent.on("submit", function (e) {
					e.preventDefault();
					var t,
						n = a.$formEvent[0];
					n.checkValidity()
						? (a.$selectedEvent
								? (a.$selectedEvent.setProp("title", l("#event-title").val()), a.$selectedEvent.setProp("classNames", [l("#event-category").val()]))
								: ((t = {
										title: l("#event-title").val(),
										start: a.$newEventData.date,
										allDay: a.$newEventData.allDay,
										className: l("#event-category").val(),
								  }),
								  a.$calendarObj.addEvent(t)),
						  a.$modal.modal("hide"))
						: (e.stopPropagation(), n.classList.add("was-validated"));
				}),
				l(
					a.$btnDeleteEvent.on("click", function (e) {
						a.$selectedEvent && (a.$selectedEvent.remove(), (a.$selectedEvent = null), a.$modal.modal("hide"));
					})
				);
		}),
		(l.CalendarApp = new e()),
		(l.CalendarApp.Constructor = e);
})(window.jQuery),
	(function () {
		"use strict";
		window.jQuery.CalendarApp.init();
	})();
