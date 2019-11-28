<template>
	<div class="vip-info">
		<template>
			<div class="title">
				{{cn?'会员信息':'Member Information'}}</div>
			<div class="content">
				<ul class="">
					<li class="info-item">
						<span class="label">
							{{cn?'会员类型':'Member Type'}}：</span>
						<span class="txt">{{user.member_type}}</span>
					</li>
					<li class="info-item">
						<span class="label">
							{{cn?'会员号':'Member ID'}}：</span>
						<span class="txt">
							{{user.member_numbers}}
						</span>
					</li>
					<li class="info-item">
						<span class="label">
							{{cn?'会员介绍':'Membership Description '}}：</span>
						<ol class="introduce txt">
							<li v-if="introductions.length>0" v-for="(item,index) in introductions">{{item}}</li>
						</ol>
					</li>
				</ul>
			</div>
		</template>

	</div>
</template>

<script>
	export default {
		name: 'vipInfo',
		data() {
			return {};
		},
		computed: {
			user() {
				return this.$store.state.userInfo;
			},
			introductions() {
				return this.$store.state.userInfo.member_introduction.split('\n');
			},
			cn() {
				return this.$store.state.language == 'cn';
			}
		}
	};
</script>

<style></style>
