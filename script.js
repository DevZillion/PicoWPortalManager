var PicoIp;

function display_pico_ver(data) {
	const name = data.name;
	const version = data.version;
	
	document.getElementById("name").innerHTML = name;
	document.getElementById("version").innerHTML = version;
}   

function update_pico_ver() {
	PicoIp = document.getElementById("pico_ip").value;
	console.log("Pico W IP set to: \n" + PicoIp);

	fetch("http://" + PicoIp + "/api/v1/info", {
		"method": "GET",
		"mode": "cors"
	})  
	.then((response) => {
		if (response.ok) {
			return response.json();
		}
		else 
		{
			throw new Error("NETWORK RESPONSE ERROR");
		}
	})
	.then(data => {
		display_pico_ver(data)
	});

}

function update_slots_info(data) {
	
	const statuses = ["Empty", "Present", "Removed", "Added"]; 
	
	var slot_1_id = document.getElementById("slot_1_id");
	var slot_1_variant = document.getElementById("slot_1_variant");
	var slot_1_status = document.getElementById("slot_1_status");
	
	var slot_2_id = document.getElementById("slot_2_id");
	var slot_2_variant = document.getElementById("slot_2_variant");
	var slot_2_status = document.getElementById("slot_2_status");
	
	var slot_3_id = document.getElementById("slot_3_id");
	var slot_3_variant = document.getElementById("slot_3_variant");
	var slot_3_status = document.getElementById("slot_3_status");
	
	var slot_4_id = document.getElementById("slot_4_id");
	var slot_4_variant = document.getElementById("slot_4_variant");
	var slot_4_status = document.getElementById("slot_4_status");
	
	var slot_5_id = document.getElementById("slot_5_id");
	var slot_5_variant = document.getElementById("slot_5_variant");
	var slot_5_status = document.getElementById("slot_5_status");
	
	var slot_6_id = document.getElementById("slot_6_id");
	var slot_6_variant = document.getElementById("slot_6_variant");
	var slot_6_status = document.getElementById("slot_6_status");
	
	if (data.slots[0].toy != null) {
		slot_1_id.innerHTML = "ID: " + data.slots[0].toy.id;
		slot_1_variant.innerHTML = "Variant: " + data.slots[0].toy.variant;
		slot_1_status.innerHTML = "Status: " + statuses[data.slots[0].status];
	} else {
		slot_1_id.innerHTML = "Empty";
		slot_1_variant.innerHTML = "-";
		slot_1_status.innerHTML = "Status: " + statuses[data.slots[1].status];
	}
	
	if (data.slots[1].toy != null) {
		slot_2_id.innerHTML = "ID: " + data.slots[1].toy.id;
		slot_2_variant.innerHTML = "Variant: " + data.slots[1].toy.variant;
		slot_2_status.innerHTML = "Status: " + statuses[data.slots[1].status];
	} else {
		slot_2_id.innerHTML = "Empty";
		slot_2_variant.innerHTML = "-";
		slot_2_status.innerHTML = "Status: " + statuses[data.slots[1].status];
	}	
	
	if (data.slots[2].toy != null) {
		slot_3_id.innerHTML = "ID: " + data.slots[2].toy.id;
		slot_3_variant.innerHTML = "Variant: " + data.slots[2].toy.variant;
		slot_3_status.innerHTML = "Status: " + statuses[data.slots[2].status];
	} else {
		slot_3_id.innerHTML = "Empty";
		slot_3_variant.innerHTML = "-";
		slot_3_status.innerHTML = "Status: " + statuses[data.slots[2].status];
	}	
	
	if (data.slots[3].toy != null) {
		slot_4_id.innerHTML = "ID: " + data.slots[3].toy.id;
		slot_4_variant.innerHTML = "Variant: " + data.slots[3].toy.variant;
		slot_4_status.innerHTML = "Status: " + statuses[data.slots[3].status];
	} else {
		slot_4_id.innerHTML = "Empty";
		slot_4_variant.innerHTML = "-";
		slot_4_status.innerHTML = "Status: " + statuses[data.slots[3].status];
	}	
	
	if (data.slots[4].toy != null) {
		slot_5_id.innerHTML = "ID: " + data.slots[4].toy.id;
		slot_5_variant.innerHTML = "Variant: " + data.slots[4].toy.variant;
		slot_5_status.innerHTML = "Status: " + statuses[data.slots[4].status];
	} else {
		slot_5_id.innerHTML = "Empty";
		slot_5_variant.innerHTML = "-";
		slot_5_status.innerHTML = "Status: " + statuses[data.slots[4].status];
	}	
	
	if (data.slots[5].toy != null) {
		slot_6_id.innerHTML = "ID: " + data.slots[5].toy.id;
		slot_6_variant.innerHTML = "Variant: " + data.slots[5].toy.variant;
		slot_6_status.innerHTML = "Status: " + statuses[data.slots[5].status];
	} else {
		slot_6_id.innerHTML = "Empty";
		slot_6_variant.innerHTML = "-";
		slot_6_status.innerHTML = "Status: " + statuses[data.slots[5].status];
	}
}

function get_and_update_slots_info() {

	fetch("http://" + PicoIp + "/api/v1/slots", {
		"method": "GET",
		"mode": "cors"
	})  
	.then((response) => {
		if (response.ok) {
			return response.json();
		}
		else 
		{
			throw new Error("NETWORK RESPONSE ERROR");
		}
	})
	.then(data => {
		update_slots_info(data);
	});
	
}

window.onload = function () {
    document.getElementById("pico_ip").addEventListener('change', update_pico_ver());
}

function delete_slot() {
	fetch("http://" + PicoIp + "/api/v1/toys?slot_index=" + document.getElementById("delete_slot_select").value, {
	"method": "DELETE",
    "mode": "cors"
    });
}

function send_slot() {

	fetch("http://" + PicoIp + "/api/v1/toys?slot_index=" + document.getElementById("send_slot_select").value, {
    "body": document.getElementById("send_slot_input").files[0],
    "method": "POST",
    "mode": "cors"
	});

}

function reboot_pico() {

	fetch("http://" + PicoIp + "/api/v1/reset?run_mode=" + document.getElementById("reboot_select").value, {
    "method": "POST",
    "mode": "cors"
	});

}
